import ServiceCard from '../components/ServiceCard'
import initial from '../assets/initial.jpg'

import './styles/home.css'

const Home = () =>{
    return(
        <main>
            <div className='welcome-card'>
                <img className='welcome-card-img' src={initial} alt="doctores img" />
                <div className='welcome-card-content'>
                    <h2 className='welcome-card-content-h2'>Clinica San Roque</h2>
                    <p className='welcome-card-content-p'>Brindamos atención médica de calidad, con confianza, calidez y compromiso, porque tu salud merece lo mejor en cada visita.</p>
                </div>
                <a href="#services"><i className="home-arrow fi fi-br-angle-down"></i></a>
            </div>
            <div id='services' className='service-card'>
                <div className='service-card-div'>
                    <p>Nuestros Servicios</p>
                    <h3>Cuidamos de vos, </h3>
                    <h3>en cada especialidad.</h3>
                </div>
                <section className='service-card-section'>
                    <ServiceCard 
                        image={initial}
                        title={"Odontología"}
                        description={"Cuidamos tu salud bucal con tecnología moderna y profesionales especializados. Realizamos limpiezas, tratamientos y rehabilitaciones para mantener tu sonrisa sana y estética."}
                        icon={<i className="fi fi-sr-tooth"></i>} /* Flaticon */
                    />
                    <ServiceCard 
                        image={initial}
                        title={"Cardiología"}
                        description={"Atendemos tu corazón con estudios precisos y especialistas en enfermedades cardiovasculares. Te acompañamos en prevención, diagnóstico y tratamiento integral."}
                        icon={<i className="fi fi-sr-pulse"></i>}
                    /><ServiceCard 
                        image={initial}
                        title={"Pediatría"}
                        description={"Cuidamos la salud de tus hijos desde recién nacidos hasta adolescentes. Ofrecemos controles, vacunas y atención personalizada para cada etapa de crecimiento."}
                        icon={<i className="fi fi-sr-puzzle-piece"></i>}
                    />
                    <ServiceCard 
                        image={initial}
                        title={"Vacunación e Inmunización"}
                        description={"Protegemos la salud de la comunidad aplicando vacunas seguras y efectivas para prevenir enfermedades. Nuestro equipo capacitado garantiza una atención rápida y confiable para todas las edades."}
                        icon={<i className="fi fi-ss-syringe-injection-blood"></i>}
                    />
                </section>
            </div>
        </main>
    )
}

export default Home