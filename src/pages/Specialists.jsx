import { SpecialistCard } from "../components/SpecialistCard"
import { DATASpecialist } from "../Data/SpecialistData"
import '../components/styles/specialistCard.css'
import { useState } from "react"

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
                    <label htmlFor="pais">Buscador de especialistas: </label>
                    <button value="Radiología" onClick={(e) => specialityFilter(e.target.value)}>Radiología</button>
                    <button value="Pediatría" onClick={(e) => specialityFilter(e.target.value)}>Pediatría</button>
                    <button value="Odontología" onClick={(e) => specialityFilter(e.target.value)}>Odontología</button>
                    <button value="Vacunación" onClick={(e) => specialityFilter(e.target.value)}>Vacunación</button>
                </form>
                <div className="specialist-card">
                    {speciality.map((specialist) => <SpecialistCard
                        key={specialist.id}
                        name={specialist.name}
                        specialty={specialist.speciality}
                        img={specialist.img} />)}
                </div>
            </div>
        </>
    )



}