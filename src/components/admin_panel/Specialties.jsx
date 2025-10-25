import { useEffect, useState } from "react"
import { useLanguage } from "../context/LanguageContext"
import Swal from "sweetalert2";
export const Specialties = () => {
    const [specialties, setSpecialties] = useState(null)
    const token = localStorage.getItem("token");
    const { t } = useLanguage();
    useEffect(() => {
        fetch("http://localhost:3000/appointment/specialties/")
            .then(res => res.json())
            .then(data => setSpecialties(data.specialties))
    }, [])
    const handleDeleteSpecialty = async (id) => {
        const result = await Swal.fire({
                    title: 'Eliminar especialidad?',
                    text: 'Esta acción no se puede deshacer',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
        });
        
        if (!result.isConfirmed) return;
        fetch("http://localhost:3000/dashboard/specialty/", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ id: id })
        })
        setSpecialties((prevStatus) => prevStatus.filter((specialty) => specialty.id != id))
    }

    const createSpecialty = async (e) => {
        e.preventDefault();
        const result = await Swal.fire({
                    title: 'Crear especialidad?',
                    text: 'Esta acción no se puede deshacer',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, crear',
                    cancelButtonText: 'Cancelar'
        });
        
        if (!result.isConfirmed) return;
        const specialty = e.target.specialty.value;
        const description = e.target.desc.value;
        const res = await fetch("http://localhost:3000/dashboard/specialty/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ specialty, description }),
        });
        const data = await res.json();
        setSpecialties([
            ...specialties,
            {
                id: data.data.id,
                specialty,
                description,
                createdAt: data.data.createdAt,
                updatedAt: data.data.updatedAt,
            },
        ]);
    };
    return (
        <article className="article_administration">
            <form onSubmit={createSpecialty}>
                <h3>{t("create_esp")||"Crear Especialidad"}</h3>
                <div>
                    <input placeholder={t("enter_esp")||"Ingrese especialidad"} required type="text" name="specialty" />
                    <input placeholder={t("enter_desc") || "Ingrese descripción"} required type="text" name="desc" />
                    <input type="submit" />
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>{t("Specialty")|| "Especialidad"}</th>
                        <th>{t("desc")||"Descripcion"}</th>
                        <th>{t("Created_At")||"Creado en"}</th>
                        <th>{t("Update_At")||"Actualizado en"}</th>
                    </tr>
                </thead>
                <tbody>
                    {specialties ? specialties.map(({ id, specialty, description, createdAt, updatedAt }) => {
                        return (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{specialty}</td>
                                <td style={{
                                    whiteSpace: "pre-wrap",   
                                    overflowWrap: "anywhere", 
                                    overflow: "visible",     
                                }}>{description}</td>

                                <td>{createdAt}</td>
                                <td>{updatedAt}</td>
                                <td className="actions">
                                    <button title={t("del_esp")||"eleminar especialidad"}onClick={() => handleDeleteSpecialty(id)}><i className="fi fi-sr-rectangle-xmark"></i></button>
                                </td>
                            </tr>
                        )
                    }) : <tr><td>Error fetching data</td></tr>}
                </tbody>
            </table>
        </article>
    )
}