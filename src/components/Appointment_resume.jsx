import './styles/appointment.css'

const Appointment_resume = ({obraSocial, plan, name, lastName,speciality, medic, date, time, isRender }) => {

  const VALOR_RENDER = 4; 
 

  if(isRender != VALOR_RENDER){
    return null
  } else {
     return (
    <div className='appointmen_container'>

        <h1>Resumen del turno</h1>
        <p>{obraSocial}</p>
        <p>{plan}</p>
        <p>{name}</p>
        <p>{lastName}</p>
        <p>{speciality}</p>
        <p>{medic}</p>
        <p>{date}</p>
        <p>{time}</p>
      
    </div>
  );
  }
};

export default Appointment_resume;
