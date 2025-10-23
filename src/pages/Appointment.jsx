import Appointment_health_insurance from '../components/Appointment_health_insurance'
import Appointment_doctors from '../components/Appointment_doctors'
import Appointment_calendar from '../components/Appointment_calendar'
import Appointment_resume from "../components/Appointment_resume.jsx"

import { DATAtimes } from "../Data/timeData.js"

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

import "../pages/styles/Appointment.css"


import { useLanguage } from "../components/context/LanguageContext"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { isLogin } from "../services/isLogin.jsx";
const Appointment = () => {
    const { t } = useLanguage();

    const [isVisual, setIsVisual] = useState(1);
    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("");
    const [medic, setMedic] = useState("");
    const [speciality, setSpeciality] = useState("");
    const [busyAppointment, setBusyAppointment] = useState([])
    const [date, setDate] = useState("");
    const [time, setTimes] = useState("");
    const [_, setFullData] = useState({})

    const navTurno = useNavigate();



    const renderComponents = async () => {
        const token = localStorage.getItem("token")
        const loginRes = await isLogin();
        if (!loginRes.ok) {
            alertify.message('Debe ingresar para solicitar un turno');
            navTurno('/login');
            return;
        }

        if (isVisual == 1) {
            (obraSocial != "" && plan != "") ? setIsVisual(2) : alertify.error("Debe ingresar sus datos");
        } else if (isVisual == 2) {
            (medic != "") ? setIsVisual(3) : alertify.error("Debe seleccionar un medico");
        } else if (isVisual == 3) {
            (!time) ? alertify.error("Debes seleccionar un horario") : setIsVisual(4)
        }
        else if (isVisual == 4) {
            await fetch("http://localhost:3000/appointment/create/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "date": fullData.date,
                    "time_id": fullData.time_id,
                    "specialist_id": fullData.doctor_id
                })
            })
            .then(res => res.json())
            .then(data => {
                data.ok && navTurno("/profile");
                data.error == 1 && alertify.error(t("busy_appointment_by_specialist"));
                data.error == 2 && alertify.error(t("busy_appointment_by_patient"));
                if(data.error == 1 || data.error == 2){
                    setIsVisual(isVisual - 2)
                    setFullData({})
                    setMedic("")    
                    setTimes(null)            
            }
                return data;
            })
            .then(data =>{
                data.ok && navTurno("/profile");
                data.ok && alertify.success(t("appointment_create"));
                return data;
            })
            .catch(error => console.log(error))
        }

    }

    async function fetchBusyAppointments(date, specialist_id) {
        fetch(`http://localhost:3000/appointment/busy?date=${date}&specialist_id=${specialist_id}`)
            .then(data => data.json())
            .then(res => {
                setBusyAppointment(res.appointments)
            })
            .catch(error => console.log(error))
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
        setSpeciality(value.special_name)
        setFullData(prev => ({ ...prev, speciality_id: value.id }))
    }

    const handleAddMedic = (value) => {
        setMedic(value)
        setFullData(prev => ({ ...prev, doctor_id: parseInt(value.id) }))
    }

    const handleSchedule = async (value) => {
        const onlyDate = value.toLocaleDateString("en-CA"); // formato YYYY-MM-DD
        setDate(onlyDate);
        await fetchBusyAppointments(onlyDate, medic.id)
        setFullData(prev => ({ ...prev, date: onlyDate }));
    }

    const handleTime = (value) => {
        const timeFilter = DATAtimes.filter((id) => id.id == value.target.value)
        setTimes(timeFilter[0])
        setFullData(prev => ({ ...prev, time_id: timeFilter[0].id }));
    }



    return (
        <>
            <div className='Appointmen-body'>
                <h1 className="title-Appointmen">{t("appointment_title")}</h1>
                <p>{t("enter_your_data")}</p>
                <div className="input-div-Appointmen">
                    <div>
                        {isVisual != 1 ? <button className={"nav-link"} onClick={() => setIsVisual(isVisual - 1)}>Volver</button> : null}
                    </div>
                    <Appointment_health_insurance addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial} isRender={isVisual} />
                    <Appointment_doctors addMedic={handleAddMedic} addEspecialidad={handleAddSpeciality} isRender={isVisual} />
                    <Appointment_calendar addTime={handleTime} date={date} busyAppointment={busyAppointment} addSchedule={handleSchedule} isRender={isVisual} />
                    {/* const Appointment_resume = ({obraSocial, plan, name, lastName,speciality, medic, date, time, isRender }) => { */}
                    <Appointment_resume obraSocial={obraSocial} plan={plan} name={localStorage.getItem("name")}
                        speciality={speciality} medic={medic} date={date} time={time} isRender={isVisual} />
                    <div className="buttom-Appointment-div">
                        <button className="nav-link" onClick={renderComponents}>{t("select")}</button>
                    </div>
                </div>

            </div>
        </>
    )


}


export default Appointment;