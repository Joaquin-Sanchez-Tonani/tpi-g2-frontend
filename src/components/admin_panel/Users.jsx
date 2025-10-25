import { useEffect, useState, useRef } from "react";
import '../styles/administration.css'
import Swal from 'sweetalert2';
import { useLanguage } from "../context/LanguageContext";
export default function Users() {
    const [users, setUsers] = useState(null);
    const [usersResave, setUsersResave] = useState(null);
    const [specialties, setSpecialties] = useState(null);
    const [disable, setDisable] = useState({ id: null, status: true });
    const [active, setActive] = useState(null)
    const token = localStorage.getItem("token");
    const { t } = useLanguage();
    const OPTIONS = (method, body) => {
        return {
            method: `${method}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        }
    }

    const useRefs = useRef({
        specialty: {},
        license: {},
        role: {}
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/dashboard/users", OPTIONS("GET")),
            fetch("http://localhost:3000/appointment/specialties", OPTIONS("GET"))
        ])
            .then(async ([resUsers, resSpecialties]) => {
                const users = await resUsers.json();
                const specialties = await resSpecialties.json();
                setUsers(users.users);
                setUsersResave(users.users)
                setSpecialties(specialties.specialties);
            })
            .catch(err => {
                console.error("Fetch errors:", err);
            });
    }, []);

    const handleInput = (id) => {
        disable.status === true ? setDisable({ id: id, status: false }) : setDisable({ id: id, status: true });
    }

    const handleFetchData = async (id) => {
        const body = {
            specialty_id: useRefs.current.specialty[id].value,
            licenseNumber: useRefs.current.license[id].value,
            role_id: useRefs.current.role[id].value
        };
        const result = await Swal.fire({
            title: 'Modificar usuario?',
            text: 'Esta acción se puede alternar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, modificar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;
        fetch(`http://localhost:3000/dashboard/users/${id}`, OPTIONS("PATCH", body))
            .then(res => res.json())
            .catch(error => console.log(error));
        setDisable({ id: null, status: true })
    }

    const handleDeleteUser = async (id) => {
        const result = await Swal.fire({
            title: '¿Deshabilitar usuario?',
            text: 'Esta acción se puede alternar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, deshabilitar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;
        fetch(`http://localhost:3000/dashboard/users/${id}`, OPTIONS("DELETE"))
            .then(res => res.json())
            .then(data => console.log(data));
        setUsers(prevData =>
            prevData.map(user =>
                user.id === id ? { ...user, isDisabled: !user.isDisabled } : user
            )
        );
    }

    const handleOrder = (event) => {
        const id = event.target.id
        setActive(id)
        if (id == "id") {
            return setUsers((prevUsers) => [...prevUsers].sort((a, b) => a.id - b.id))
        }
        if (id == "role") {
            return setUsers((prevUsers) => [...prevUsers].sort((a, b) => b.role_id - a.role_id))
        }
        if (id == "specialty") {
            return setUsers((prevUsers) => [...prevUsers].sort((a, b) => a.specialty_id - b.specialty_id))
        }
    }

    const handleSearch = (event) => {
        const input = event.target.value
        const length = input.length
        return setUsers(usersResave.filter((user) => user.name.slice(0, length).toLowerCase() == input.toLowerCase()))
    }

    return (
        <article className="article_administration">
            <nav className="fixed_nav">
                <input onChange={handleSearch} className="search-by-name" placeholder={t("search") || "Buscar por nombre"} type="search" name="search" id="" />
                <ul className="handle_order">
                    <li><button className={active == "id" ? "active" : ""} id="id" onClick={handleOrder}>{t("order_id") || "Ordenar por id"}</button></li>
                    <li><button className={active == "specialty" ? "active" : ""} id="specialty" onClick={handleOrder}>{t("order_spe") || "ordenar por especialidad"}</button></li>
                    <li><button className={active == "role" ? "active" : ""} id="role" onClick={handleOrder}>{t("order_rol") || "Ordenar por role"}</button></li>
                </ul>
            </nav>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("name") || "Nombre"}</th>
                        <th>{t("lastname") || "Apellido"}</th>
                        <th>Email</th>
                        <th>{t("Specialty") || "Especialidad"}</th>
                        <th>L. {t("number") || "Numero"}</th>
                        <th>Role</th>
                        <th>{t("Created_At") || "Creado en"}</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {users ? users.map(({ id, name, lastName, email, licenseNumber, isDisabled, specialty_id, role_id, createdAt }) => {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{lastName}</td>
                                <td>{email}</td>
                                <td>
                                    <select
                                        type="text"
                                        defaultValue={specialty_id ?? 0}
                                        disabled={disable.id === id ? disable.status : true}
                                        ref={el => useRefs.current.specialty[id] = el}
                                    >
                                        <option key={id} disabled value="0">Sin especialidad</option>
                                        {specialties ? specialties.map(({ id, specialty }) => {
                                            return (
                                                <option key={id} value={id}>{specialty}</option>
                                            )
                                        }) : null}
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        defaultValue={licenseNumber}
                                        disabled={disable.id === id ? disable.status : true}
                                        ref={el => useRefs.current.license[id] = el}
                                    />
                                </td>
                                <td>
                                    <select
                                        type="text"
                                        defaultValue={role_id}
                                        disabled={disable.id === id ? disable.status : true}
                                        ref={el => useRefs.current.role[id] = el}
                                    >
                                        <option value="1">Patient</option>
                                        <option value="2">Specialist</option>
                                        <option value="3">Admin</option>
                                    </select>
                                </td>
                                <td>{createdAt.split("T")[0]}</td>
                                <td>{isDisabled ? "Disabled" : "Active"}</td>
                                <td className="actions">
                                    <button title="Deshabilitar usuario" onClick={() => handleDeleteUser(id)}><i className="fi fi-sr-calendar-shift-swap"></i></button>
                                    <button title="Modificar campo" onClick={() => handleInput(id)}><i className="fi fi-sr-pen-square"></i></button>
                                    <button className={disable.id === id && disable.status === false ? "" : "actions_button_disable"} disabled={disable.id === id && disable.status === false ? false : true} title="Enviar cambios" onClick={() => handleFetchData(id)}><i className="fi fi-sr-move-to-folder"></i></button>
                                </td>
                            </tr>
                        )
                    }) : <tr><td>Error fetching data</td></tr>}
                </tbody>
            </table>
        </article>
    )
}
