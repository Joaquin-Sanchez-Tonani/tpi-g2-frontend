import { useState , useEffect} from "react"


import { SpecialistCard } from "../components/SpecialistCard"
import Spinner from 'react-bootstrap/Spinner';

import '../components/styles/specialistCard.css'
import './styles/specialist.css'

export const Specialists = () => {

        const [medics, SetMedics] = useState([]);
        const [specialties, setSpecialties] = useState([]);
        const [filter, setFilter] = useState("");
        

        useEffect(() => {
            async function fetchMedics() {
                const response = await fetch('http://localhost:3000/dashboard/users');
                const data = await response.json();
                SetMedics(data.users);
            }            
            async function fetchSpecialties() {
                const response = await fetch('http://localhost:3000/appointment/specialties');
                const data = await response.json();
                setSpecialties(data.specialties);
            }
            fetchSpecialties();
            fetchMedics();
        }, []);

        let medicData = [];

        filter ? medicData = (medics.filter((e) => e.specialty_id == filter)) : medicData = medics


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
                <label className="specialist-label">Seleccione una especialidad </label>

                        <div className="specialist-div-buttoms">
                        {!specialties || specialties.length === 0 ? (
                                <Spinner animation="border" variant="secondary" />
                                ) : (
                                specialties.map((e) => (
                                    <button className="nav-link" key={e.id} value={e.id} onClick={(e) => setFilter(e.target.value)}>{e.specialty}</button>
                                ))
                                )}
                                <button className="nav-link" key={0} value={""} onClick={(e) => setFilter(e.target.value)}>Ver todos</button>

                    </div>

              
                    <div className="specialist-card">

                        {!medics || medics.length === 0 ? (
                                <Spinner animation="border" variant="secondary" />
                                ) : (

                                    medicData.map((med) => 
                                    med.licenseNumber ? 
                                                <SpecialistCard
                                                    key={med.id}
                                                    name={med.name + " " + med.lastName}
                                                    speciality={specialties.filter((e) => e.id == med.specialty_id)[0].specialty}
                                                    img={"https://thumbs.dreamstime.com/b/doctor-cara-de-la-experiencia-4979821.jpg"} />
                                                : ""))
                            }
                                                

                    </div>          
                    </form>  
            </div>

        
        </>           
    )

};

