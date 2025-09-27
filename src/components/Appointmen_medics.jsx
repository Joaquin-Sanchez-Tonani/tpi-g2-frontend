
import './styles/appointmen.css'
import { DATASpecialist } from "../Data/SpecialistData"
 import { useState } from "react"


const Appointmen_medics = ({ addMedic, addEspecialidad, isRender }) => {

  let medicsArray = DATASpecialist;
  const medicsSpeciality = medicsArray.map(med => med.speciality);
  const medicsSpecialitySinDup = [...new Set(medicsSpeciality)];


  const [filter, setFilter] = useState("");

  if(filter !== ""){
    medicsArray = DATASpecialist.filter(med => med.speciality == filter);
  }

  const VALOR_RENDER = 2

    const handleClickMedic = (event) => {
    addMedic(event.target.value);

  };

  const handleTipoEspecialidad = (event) => {
    addEspecialidad(event.target.value);
    setFilter(event.target.value);
    console.log(filter)
  };



  if (isRender != VALOR_RENDER){
    return null;
  } else {
    return (
    <div className='appointmen_container'>
      <select class="form-select appointmen-select" onChange={handleClickMedic}>
        <option value="0" disabled hidden selected>
          Seleccione un medico
        </option>
          {medicsArray.map(med => <option key={med.id} value={med.id}>{med.name}</option> )}
      </select>

      <select class="form-select appointmen-select" onChange={handleTipoEspecialidad}>
        <option value="0" disabled hidden selected>
          Seleccione una especialidad:
        </option>
        {medicsSpecialitySinDup.map(med => <option key={med} value={med}>{med}</option>)}

      </select>
    </div>
  );
  }
};

export default Appointmen_medics;
