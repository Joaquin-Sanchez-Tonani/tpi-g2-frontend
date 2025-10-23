import ServiceCard from '../components/ServiceCard'
import initial from '../assets/initial.jpg'
import Spinner from 'react-bootstrap/Spinner';

import './styles/home.css'

import { useEffect, useState } from "react";
import { useLanguage } from "../components/context/LanguageContext.jsx";
const Home = () => {

    const [specialties, setSpecialties] = useState([]);
    const { t } = useLanguage();
    async function fetchSpecialties() {
        const response = await fetch('http://localhost:3000/appointment/specialties');
        const data = await response.json();
        console.log(data)
        setSpecialties(data.specialties);
    }

    useEffect(() => {

        fetchSpecialties();
    }, []);





    return (
        <main>
            <div className='welcome-card'>
                <img className='welcome-card-img' src={initial} alt="doctores img" />
                <div className='welcome-card-content'>
                    <h2 className='welcome-card-content-h2'>
                        {t("home_title") || "Clínica Vita Nova"}
                    </h2>
                    <p className='welcome-card-content-p'>
                        {t("home_intro") || "Brindamos atención médica de calidad, con confianza, calidez y compromiso, porque tu salud merece lo mejor en cada visita."}
                    </p>
                </div>
                <a href="#services"><i className="home-arrow fi fi-br-angle-down"></i></a>
            </div>

            <div id='services' className='service-card'>
                <div className='service-card-div'>
                    <p>{t("home_services_label") || "Nuestros Servicios"}</p>
                    <h3>{t("home_care_line_1") || "Cuidamos de vos,"}</h3>
                    <h3>{t("home_care_line_2") || "en cada especialidad."}</h3>
                </div>

                <section className='service-card-section'>
                    {!specialties || specialties.length === 0 ? (
                        <Spinner animation="border" variant="secondary" />
                    ) : (
                        specialties.map((e) => (
                            <ServiceCard
                                key={e.id}
                                title={e.specialty}
                                description={e.description} />
                        ))
                    )}

                </section>
            </div>
        </main>
    )
}

export default Home