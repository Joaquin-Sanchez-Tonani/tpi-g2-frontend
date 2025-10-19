
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
    const [speciality, setSpeciality] = useState("");
    const [busyAppointment, setBusyAppointment] = useState([])
    const [date, setDate] = useState("");
    const [time, setTimes] = useState("");
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
            (!time) ? alertify.error("Debes seleccionar un horario") : setIsVisual(4)
        }
        else if (isVisual == 4){
            
            console.log({date: date, time: time.id, medic: Number(medic.id)})

             fetch("http://localhost:3000/appointment/create", {
                method:"POST",
                body: JSON.stringify({date: date, time_id: time.id, specialist_id: Number(medic.id), patient_id: localStorage.getItem("id")}),
                headers: {
                    "Content-Type": "application/json",
                },
             }).then((res) => res.json())
               .then((data) => console.log(data))

        }

    }

       async function fetchBusyAppointments(date, specialist_id) {
        console.log(specialist_id)
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
        console.log(value)
        setSpeciality(value.special_name)
        console.log(speciality)
        setFullData(prev => ({ ...prev, speciality_id: value.id }))
    }

    const handleAddMedic = (value) => {
        setMedic(value)
        setFullData(prev => ({ ...prev, doctor_id: medic.id }))
    }

    const handleSchedule = async (value) => {
        const onlyDate = value.toLocaleDateString("en-CA"); // formato YYYY-MM-DD
        setDate(onlyDate);
        await fetchBusyAppointments(onlyDate, medic.id)
        setFullData(prev => ({ ...prev, date: onlyDate }));
    }

    const handleTime = (value) =>{
        const timeFilter = DATAtimes.filter((id) => id.id == value.target.value)
        setTimes(timeFilter[0])
        console.log(time.id)
        setFullData(prev => ({ ...prev, time_id: time.id }));
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
                    <Appointment_resume obraSocial={obraSocial} plan={plan} 
                        speciality={speciality} medic={medic} date={date} time={time} isRender={isVisual}/>
                    <div className="buttom-Appointment-div">
                        <button className="nav-link" onClick={renderComponents}>Seleccionar</button>
                    </div>
                </div>

            </div>
        </>
    )


}


export default Appointment;