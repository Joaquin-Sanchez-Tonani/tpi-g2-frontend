import { useEffect, useState, useRef, act } from "react";
import '../styles/administration.css'

export default function Users() {
    const [users, setUsers] = useState(null);
    const [usersResave, setUsersResave] = useState(null);
    const [specialties, setSpecialties] = useState(null);
    const [disable, setDisable] = useState({ id: null, status: true });
    const [active,setActive] = useState(null)
    const token = localStorage.getItem("token");
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
        window.confirm("Estás seguro de los cambios?")
        fetch(`http://localhost:3000/dashboard/users/${id}`, OPTIONS("PATCH", body))
            .then(res => res.json())
            .then(data => console.log(data));
        setDisable({ id: null, status: true })
    }

    const handleDeleteUser = async (id) => {
        window.confirm("Estás seguro de eliminar este usuario?")
        fetch(`http://localhost:3000/dashboard/users/${id}`, OPTIONS("DELETE"))
            .then(res => res.json())
            .then(data => console.log(data));
        setUsers(usersResave.filter((user) => user.id != id))
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
                <input onChange={handleSearch} className="search-by-name" placeholder="Buscar por nombre" type="search" name="search" id="" />
                <ul className="handle_order">
                    <li><button className={active == "id" ? "active" : ""} id="id" onClick={handleOrder}>Ordenar por id</button></li>
                    <li><button className={active == "specialty" ? "active" : ""} id="specialty" onClick={handleOrder}>Ordenar por especialidad</button></li>
                    <li><button className={active == "role" ? "active" : ""} id="role" onClick={handleOrder}>Ordenar por role</button></li>
                </ul>
            </nav>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Specialty</th>
                        <th>L. Number</th>
                        <th>Role</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {users ? users.map(({ id, name, lastName, email, licenseNumber, cellphone, specialty_id, role_id, createdAt }) => {
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
                                <td className="actions">
                                    <button title="Eliminar usuario" onClick={() => handleDeleteUser(id)}><i className="fi fi-sr-rectangle-xmark"></i></button>
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
