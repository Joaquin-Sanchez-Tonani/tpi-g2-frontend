import { useState, useEffect } from "react"


import { SpecialistCard } from "../components/SpecialistCard"
import Spinner from 'react-bootstrap/Spinner';

import '../components/styles/specialistCard.css'
import './styles/specialist.css'

export const Specialists = () => {

    const [medics, SetMedics] = useState([{}]);
    const [specialties, setSpecialties] = useState([]);


    useEffect(() => {
        async function fetchSpecialties() {
            const response = await fetch('http://localhost:3000/appointment/specialties');
            const data = await response.json();
            setSpecialties(data.specialties);
            const e = {target: {value: data.specialties[0].id}}
            handleSpecialistsFiltered(e);
        }
        fetchSpecialties();
    }, []);

    const handleSpecialistsFiltered = async (e) => {
        const id = e.target.value
        const response = await fetch(`http://localhost:3000/appointment/specialists/${id}`);
        const res = await response.json();
        if(res.ok) SetMedics(res.specialists)
        else  SetMedics([{}])
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
                    e.preventDefault();
                }}>

                    <div className="sticky-content">
                        <div className="specialist-div-buttons">
                        {!specialties ? (
                            <Spinner animation="border" variant="secondary" />
                        ) : (
                            specialties.map((e) => (
                                <button className={medics[0].specialty_id == e.id ? "nav-link active2" : "nav-link"} key={e.id} value={e.id} onClick={handleSpecialistsFiltered}>{e.specialty}</button>
                            ))
                        )}
                        </div>
                    </div>


                    <div className="specialist-card">


                        {!medics ? (
                            <Spinner animation="border" variant="secondary" />
                        ) : (

                            medics.map((med) =>
                                med.licenseNumber ?
                                    <SpecialistCard
                                        key={med.id}
                                        name={med.name + " " + med.lastName}
                                        specialty={specialties.find((e) => e.id == med.specialty_id).specialty}
                                        licenseNumber={med.licenseNumber}
                                        email={med.email}
                                    />
                                    : "No se encontraron especialistas."))
                        }

                    </div>
                </form>
            </div>


        </>
    )

};

