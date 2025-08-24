import { SpecialistCard } from "../components/SpecialistCard"
import { DATASpecialist } from "../Data/SpecialistData"
import '../components/styles/specialistCard.css'


export const Specialists = () => {

    return (

        <div className="specialist-card">
                    {DATASpecialist.map((specialist) => <SpecialistCard 
                                                        key={specialist.id} 
                                                        name={specialist.name}
                                                        specialty={specialist.speciality}
                                                        img={specialist.img}/>)}
        </div>

    )



}