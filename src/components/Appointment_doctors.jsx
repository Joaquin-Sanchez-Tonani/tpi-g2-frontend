
import './styles/appointment.css'
import { useEffect, useState } from "react"
import { useLanguage } from "../components/context/LanguageContext"

const Appointment_medics = ({ addMedic, addEspecialidad, isRender }) => {
  const { t } = useLanguage();
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
    let medic_name;
    specialists.map((e) => e.id == event.target.value ? medic_name = `${e.name} ${e.lastName}` : null);
    // console.log(medic_name)
    addMedic({"id" : id, "name" : medic_name});
  };

  const handleTipoEspecialidad = (event) => {
  
    const special_name = specialties.filter((e) => e.id == event.target.value)
    const id = event.target.value
    addEspecialidad({"id" : id, "special_name": special_name[0].specialty});
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
            {t("select_esp")||"Debe seleccionar una especialidad"}:
          </option>
          {specialties ? specialties.map(med =>
            <option key={med.id} value={med.id}>{med.specialty}</option>)
            :
            null
          }
        </select>
        <select defaultValue="0"  className="form-select appointmen-select" onChange={handleClickMedic}>
          <option value="0" disabled hidden>
            {t("select_med")|| "Debe seleccionar un medico"}
          </option>

          {specialists ? specialists.map(med => <option key={med.id} value={med.id}>{`${med.name} ${med.lastName}`}</option>)

            : null
          }
        </select>
      </div>
    );
  }
};

export default Appointment_medics;
