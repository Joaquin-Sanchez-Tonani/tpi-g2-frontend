import { useState } from "react"


import { SpecialistCard } from "../components/SpecialistCard"
import { DATASpecialist } from "../Data/SpecialistData"

import '../components/styles/specialistCard.css'
import './styles/specialist.css'

export const Specialists = () => {
    const [speciality, setSpecility] = useState(DATASpecialist)
    const specialityFilter = (value) => {
        value == "*" ? setSpecility(DATASpecialist) : setSpecility(DATASpecialist.filter(e => e.speciality.includes(value)))
    }
    return (
        <>
            <div className="specialist-card-div">
                <div className="title-specialist-card-div">
                    <p>Nuestros Profesionales </p>
                    <h1 className="title-specialist-card">Los mejores profesionales,</h1>
                    <h1 className="title-specialist-card">siempre a tu disposicion</h1>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault(); // evita que se recargue la página
                    console.log("Formulario enviado");
                }}>
                <label className="specialist-label">Seleccione una especialidad </label>
                     <div className="specialist-div-buttoms">
                        <button className="nav-link" value="Radiología" onClick={(e) => specialityFilter(e.target.value)}>Radiología</button>
                        <button className="nav-link" value="Pediatría" onClick={(e) => specialityFilter(e.target.value)}>Pediatría</button>
                        <button className="nav-link" value="Odontología" onClick={(e) => specialityFilter(e.target.value)}>Odontología</button>
                        <button className="nav-link" value="Vacunación" onClick={(e) => specialityFilter(e.target.value)}>Vacunación</button>
                    </div>
                </form>
                { <div className="specialist-card">
                    {speciality.map((specialist) => <SpecialistCard
                        key={specialist.id}
                        name={specialist.name}
                        speciality={specialist.speciality}
                        img={specialist.img} />)}
                </div> }
            </div>

        
        </>              
    )



}