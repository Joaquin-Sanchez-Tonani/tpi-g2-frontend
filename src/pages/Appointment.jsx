
import Appointment_health_insurance from '../components/Appointment_health_insurance'
import Appointment_doctors from '../components/Appointment_doctors'
import Appointment_calendar from '../components/Appointment_calendar'
import Appointment_resume from "../components/Appointment_resume.jsx"

import {DATAtimes} from "../Data/timeData.js"

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

import "../pages/styles/Appointment.css"


import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { isLogin } from "../services/isLogin.jsx";
const Appointment = () => {


    const [isVisual, setIsVisual] = useState(1);
    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("");
    const [medic, setMedic] = useState("");
    const [_, setSpeciality] = useState("");
    const [busyAppointment, setBusyAppointment] = useState([])
    const [date, setDate] = useState("");
    const [fullData, setFullData] = useState({})

    const navTurno = useNavigate();



    const renderComponents = async () => {

        const loginRes = await isLogin();
         if(!loginRes.ok){
            console.log(loginRes,111)
              alertify.message('Debe ingresar para solicitar un turno');
            navTurno('/login');
             return;
         }

        if (isVisual == 1) {
            (obraSocial != "" && plan != "") ? setIsVisual(2) : alertify.error("Debe ingresar sus datos");
        } else if (isVisual == 2) {
            (medic != "") ? setIsVisual(3) : alertify.error("Debe seleccionar un medico");
        } else if (isVisual == 3){
            (!fullData.time_id) ? alertify.error("Debes seleccionar un horario") : setIsVisual(4)
        }
        // falta isVisual 3

    }

       async function fetchBusyAppointments(date, specialist_id) {
        fetch(`http://localhost:3000/appointment/busy?date=${date}&specialist_id=${specialist_id}`)
            .then(data => data.json())
            .then(res => {
                console.log(res)
                setBusyAppointment(res.appointments)
            })
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
        console.log(value.target.value)
        console.log(DATAtimes.filter((id) => id.id == value.target.value));
        setFullData(prev => ({ ...prev, time_id: value.target.value }));
    }



    return (
        <>
            <div className='Appointmen-body'>
                <h1 className="title-Appointmen">Consulta por nuestros turnos</h1>
                <p>Ingrese sus datos</p>
                <div className="input-div-Appointmen">
                    <div> 
                        {isVisual != 1 ? <button className={"nav-link"} onClick={() =>setIsVisual(isVisual - 1)}>Volver</button> : null}
                    </div>
                    <Appointment_health_insurance addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial} isRender={isVisual} />
                    <Appointment_doctors addMedic={handleAddMedic} addEspecialidad={handleAddSpeciality} isRender={isVisual} />
                    <Appointment_calendar addTime={handleTime} date={date} busyAppointment={busyAppointment} addSchedule={handleSchedule} isRender={isVisual} />
                    {/* const Appointment_resume = ({obraSocial, plan, name, lastName,speciality, medic, date, time, isRender }) => { */}
                    <Appointment_resume obraSocial={}/>
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


export default Appointment;