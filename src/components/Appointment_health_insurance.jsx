import './styles/appointment.css'

const Appointment_obraSocial = ({ addObraSocial, addPlanSocial, isRender }) => {

  const VALOR_RENDER = 1; 
 
  const handleClickObraSocial = (event) => {
    addObraSocial(event.target.value);
  };

  const handleClickPlan = (event) => {
    addPlanSocial(event.target.value);
  };


  if(isRender != VALOR_RENDER){
    return null
  } else {
     return (
    <div className='appointmen_container'>
      <select defaultValue="0" className="form-select appointmen-select" onChange={handleClickObraSocial}>
        <option value="0" disabled hidden>
          Elige una obra social:
        </option>
        <option value="Obra social 1">Obra social 1</option>
        <option value="Obra social 2">Obra social 2</option>
        <option value="Obra social 3">Obra social 3</option>
        <option value="Obra social 4">Obra social 4</option>
      </select>

      <select defaultValue="0" className="form-select appointmen-select" onChange={handleClickPlan}>
        <option value="0" disabled hidden>
          Seleccione plan:
        </option>
        <option value="1">Plan 1</option>
        <option value="2">Plan 2</option>
        <option value="3">Plan 3</option>
        <option value="4">Plan 4</option>
      </select>
    </div>
  );
  }
};

export default Appointment_obraSocial;
