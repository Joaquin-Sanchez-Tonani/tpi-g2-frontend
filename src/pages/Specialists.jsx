import { SpecialistCard } from "../components/SpecialistCard"
import { DATASpecialist } from "../Data/SpecialistData"
import '../components/styles/specialistCard.css'



export const Specialists = () => {

    return (
        <div className="specialist-card-div">
            <div className="title-specialist-card-div">
                <p>Nuestros Profesionales </p>
                <h1 className="title-specialist-card">Los mejores profesionales,</h1>
                <h1 className="title-specialist-card">siempre a tu disposicion</h1>
            </div>
            <div className="specialist-card">
                        {DATASpecialist.map((specialist) => <SpecialistCard 
                                                            key={specialist.id} 
                                                            name={specialist.name}
                                                            specialty={specialist.speciality}
                                                            img={specialist.img}/>)}
            </div>
        </div>               
    )



}