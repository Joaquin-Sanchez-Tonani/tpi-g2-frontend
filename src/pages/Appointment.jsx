
import "../pages/styles/Appointment.css"
import Appointmen_obraSocial from '../components/Appointmen_obraSocial'
 import { useState } from "react"

const Appointment = () => {

    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("")

    const handleAddObraSocial = (value) => {
            setObraSocial(value)
            console.log(obraSocial)
    }

    const handlePlanSocial = (value) => {
            setPlan(value)
            console.log(plan)
    }

    return (   
        <div className="Appointmen-body">
                <h1>Consulta por nuestros turnos</h1>
                    <Appointmen_obraSocial addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial}/>
                                           
    
                    
            

                

                 
        </div>
    )


}


export default Appointment