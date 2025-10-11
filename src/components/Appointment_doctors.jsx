
import './styles/appointment.css'
import { useEffect, useState } from "react"


const Appointment_medics = ({ addMedic, addEspecialidad, isRender }) => {
  const [specialties, setSpecialties] = useState([])
  const [specialists, setSpecialists] = useState([])

  const GetSpecialites = () => {
    const URL = "http://localhost:3000/appointment/specialties/"
    const OPTIONS = {
      method: "GET"
    }
    fetch(URL, OPTIONS)
      .then(data => data.json())
      .then(res => setSpecialties(res.specialties))
      .catch(e => console.log(e))
  }
  useEffect(GetSpecialites, [])

  const GetSpecialists = (id) => {
    const URL = `http://localhost:3000/appointment/specialists/${id}`
    const OPTIONS = {
      method: "GET"
    }
    try {
      fetch(URL, OPTIONS)
        .then(data => data.json())
        .then(res => setSpecialists(res.specialists))
        .catch(e => console.log(e))
    } catch (e) {
      console.log("GetSpecialists error: ", e)
    }
  }

  const handleClickMedic = (event) => {
    const id = event.target.value
    addMedic(id);
  };

  const handleTipoEspecialidad = (event) => {
    const id = event.target.value
    addEspecialidad(id);
    GetSpecialists(id)
  };

  const VALOR_RENDER = 2

  if (isRender != VALOR_RENDER) {
    return null;
  } else {
    return (
      <div className='appointmen_container'>
        <select defaultValue="0" className="form-select appointmen-select" onChange={handleTipoEspecialidad}>
          <option value="0" disabled hidden>
            Seleccione una especialidad:
          </option>
          {specialties ? specialties.map(med =>
            <option key={med.id} value={med.id}>{med.specialty}</option>)
            :
            null
          }
        </select>
        <select defaultValue="0"  className="form-select appointmen-select" onChange={handleClickMedic}>
          <option value="0" disabled hidden>
            Seleccione un medico
          </option>
<<<<<<< HEAD
          {specialists ? specialists.map(med => <option key={med.id} value={med.id}>{med.name + " " + med.lastName} </option>)
=======
          {specialists ? specialists.map(med => <option key={med.id} value={med.id}>{`${med.name} ${med.lastName}`}</option>)
>>>>>>> 28b63dc7158f3f778d7a249bce9d8ebab16d35a4
            : null
          }
        </select>
      </div>
    );
  }
};

export default Appointment_medics;
