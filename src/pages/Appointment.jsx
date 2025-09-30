
import Appointmen_obraSocial from '../components/Appointmen_obraSocial'
import Appointmen_medics from '../components/Appointmen_medics'
import Appointmen_turno from '../components/Appointmen_turno'

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.min.css"; // Or another theme like bootstrap.min.css

import "../pages/styles/Appointment.css"


 import { useEffect, useState } from "react"

const Appointment = () => {






    const [isVisual, setIsVisual] = useState(1);

    const [obraSocial, setObraSocial] = useState("");
    const [plan, setPlan] = useState("");

    const [medic, setMedic] = useState("");
    const [speciality, setSpeciality] = useState("");



    const renderComponents = () => {

        if(isVisual == 1){
            console.log(obraSocial);
            console.log(plan);

            (obraSocial != "" && plan != "") ? setIsVisual(2) : alertify.error("Debe ingresar sus datos");
            
        } else if (isVisual == 2){
            console.log(medic);
            console.log(speciality);

            (medic != "") ? setIsVisual(3) : alertify.error("Debe seleccionar un medico");
        }  


        console.log("visual : " + {isVisual})
    }

    const handleAddObraSocial = (value) => {
            setObraSocial(value)
            console.log(obraSocial)
    }

    const handlePlanSocial = (value) => {
            setPlan(value)
            console.log(plan)
    }

    const handleAddMedic = (value) => {
            setMedic(value)
            console.log(medic)
    }

    const handleAddSpeciality = (value) => {
            setSpeciality(value)
            console.log(speciality)
    }

    useEffect(() => {
    if (!medic) return; 

    fetch("http://localhost:3000/appointment/appointment", {
        method: "POST",
        body: JSON.stringify({ medic_id: medic }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error en la petición: " + res.status);
            }
            return res.json();
        })
        .then((data) => console.log("Respuesta del servidor:", data))
        .catch((error) => console.error("Error:", error));
}, [medic]);








    return (   
        <>
        <div className='Appointmen-body'>
                    <h1 className="title-Appointmen">Consulta por nuestros turnos</h1>
                    <p>Ingrese sus datos</p>
                        <div className="input-div-Appointmen">
                            <Appointmen_obraSocial addObraSocial={handleAddObraSocial} addPlanSocial={handlePlanSocial} isRender={isVisual}/>
                            <Appointmen_medics addMedic={handleAddMedic} addEspecialidad={handleAddSpeciality} isRender={isVisual}/>
                            <Appointmen_turno isRender={isVisual}/>
                        </div>
                    
            

                <div className="buttom-Appointment-div">
                    <button className="nav-link" onClick={renderComponents}>Seleccionar</button>
                </div>
        </div>
        </>
    )


}


export default Appointment;