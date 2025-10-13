import { useEffect, useState } from "react"

export const Specialties = () => {
    const [specialties, setSpecialties] = useState(null)
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetch("http://localhost:3000/appointment/specialties/")
            .then(res => res.json())
            .then(data => setSpecialties(data.specialties))
    }, [])
    const handleDeleteSpecialty = (id) => {
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
                <h3>Crear Especialidad</h3>
                <div>
                    <input placeholder="Ingrese especialidad" required type="text" name="specialty" />
                    <input placeholder="Ingrese descripción" required type="text" name="desc" />
                    <input type="submit" />
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Specialty</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Updated At</th>
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
                                    <button title="Eliminar especialidad" onClick={() => handleDeleteSpecialty(id)}><i className="fi fi-sr-rectangle-xmark"></i></button>
                                </td>
                            </tr>
                        )
                    }) : <tr><td>Error fetching data</td></tr>}
                </tbody>
            </table>
        </article>
    )
}