
import Appointment_health_insurance from '../components/Appointment_health_insurance'
import Appointment_doctors from '../components/Appointment_doctors'
import Appointment_calendar from '../components/Appointment_calendar'

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

import "../pages/styles/Appointment.css"


import { useState } from "react"

const Appointment = () => {

    const [isVisual, setIsVisual] = useState(1);

    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("");

    const [medic, setMedic] = useState("");
    const [speciality, setSpeciality] = useState("");

    const [fullData, setFullData] = useState({})

    const renderComponents = () => {
        if (isVisual == 1) {
            (obraSocial != "" && plan != "") ? setIsVisual(2) : alertify.error("Debe ingresar sus datos");
        } else if (isVisual == 2) {
            (medic != "") ? setIsVisual(3) : alertify.error("Debe seleccionar un medico");
        }
        // falta isVisual 3
    }

    const handleAddObraSocial = (value) => {
        setObraSocial(value)
        setFullData(prev => ({ ...prev, health_insurance: value }))
    }

    const handlePlanSocial = (value) => {
        setPlan(value)
        setFullData(prev => ({ ...prev, plan: value }))
    }

    const handleAddSpeciality = (value) => {
        setSpeciality(value)
        setFullData(prev => ({ ...prev, speciality: value }))
    }

    const handleAddMedic = (value) => {
        setMedic(value)
        setFullData(prev => ({ ...prev, doctor: value }))
    }

    return (
        <>
            <div className='Appointmen-body'>
                <h1 className="title-Appointmen">Consulta por nuestros turnos</h1>
                <p>Ingrese sus datos</p>
                <div className="input-div-Appointmen">
                    <Appointment_health_insurance addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial} isRender={isVisual} />
                    <Appointment_doctors addMedic={handleAddMedic} addEspecialidad={handleAddSpeciality} isRender={isVisual} />
                    <Appointment_calendar isRender={isVisual} />
                </div>



                <div className="buttom-Appointment-div">
                    <button className="nav-link" onClick={renderComponents}>Seleccionar</button>
                </div>
                {
                    <h1>{Object.entries(fullData).map(([keys, value]) =>
                        <li key={keys}>{keys}: {value}</li>
                    )}</h1> ?? <h1>Nada</h1>
                }
            </div>
        </>
    )


}


export default Appointment