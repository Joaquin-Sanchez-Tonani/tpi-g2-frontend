
import Appointment_health_insurance from '../components/Appointment_health_insurance'
import Appointment_doctors from '../components/Appointment_doctors'
import Appointment_calendar from '../components/Appointment_calendar'

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

import "../pages/styles/Appointment.css"


import { use, useState } from "react"

const Appointment = () => {

    const [isVisual, setIsVisual] = useState(1);

    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("");

    const [medic, setMedic] = useState("");
    const [speciality, setSpeciality] = useState("");

    const [date, setDate] = useState("");

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
        const id = localStorage.getItem("user_id")
        setObraSocial(value)
        setFullData(prev => ({ ...prev, health_insurance: value, patient_id: id }))
    }

    const handlePlanSocial = (value) => {
        setPlan(value)
        setFullData(prev => ({ ...prev, plan: value }))
    }

    const handleAddSpeciality = (value) => {
        setSpeciality(value)
        setFullData(prev => ({ ...prev, speciality_id: value }))
    }

    const handleAddMedic = (value) => {
        setMedic(value)
        setFullData(prev => ({ ...prev, doctor_id: value }))
    }

    const handleSchedule = async (value) => {
        const onlyDate = value.toLocaleDateString("en-CA"); // formato YYYY-MM-DD
        setDate(onlyDate);
        await fetchBusyAppointments(onlyDate, medic)
        setFullData(prev => ({ ...prev, date: onlyDate }));
    }

    const handleTime = (value) =>{
        setFullData(prev => ({ ...prev, time_id: value.target.value }));
    }

    const [busyAppointment, setBusyAppointment] = useState([])

    async function fetchBusyAppointments(date, specialist_id) {
        fetch(`http://localhost:3000/appointment/busy?date=${date}&specialist_id=${specialist_id}`)
            .then(data => data.json())
            .then(res => {
                console.log(res)
                setBusyAppointment(res.appointments)
            })
    }

    return (
        <>
            <div className='Appointmen-body'>
                <h1 className="title-Appointmen">Consulta por nuestros turnos</h1>
                <p>Ingrese sus datos</p>
                <div className="input-div-Appointmen">
                    <Appointment_health_insurance addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial} isRender={isVisual} />
                    <Appointment_doctors addMedic={handleAddMedic} addEspecialidad={handleAddSpeciality} isRender={isVisual} />
                    <Appointment_calendar addTime={handleTime} date={date} busyAppointment={busyAppointment} addSchedule={handleSchedule} isRender={isVisual} />
                    <div className="buttom-Appointment-div">
                        <button className="nav-link" onClick={renderComponents}>Seleccionar</button>
                    </div>
                </div>
                <div>
                    <h2>Resumen de turno</h2>
                    <ul>
                        {Object.entries(fullData).map(([key, value]) => (
                            <li key={key}>
                                {key}: {String(value)}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )


}


export default Appointment