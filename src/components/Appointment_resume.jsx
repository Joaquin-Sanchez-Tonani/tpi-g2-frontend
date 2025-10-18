import './styles/appointment.css'

const Appointment_resume = ({obraSocial, plan,speciality, medic, date, time, isRender }) => {

  const VALOR_RENDER = 4; 
 
    console.log(obraSocial);
      console.log(plan);

        console.log(localStorage.getItem("user_lastName"));

         console.log(localStorage.getItem("user_name"));

          console.log(speciality);

             console.log(medic.name);

                console.log(date);
               console.log(time.value)



  if(isRender != VALOR_RENDER){
    return null
  } else {
     return (
    <div className='appointmen-resume'>
        <h1 className='appointmen-resume-title'>Resumen del turno</h1>
          <section className='appointmen-section'>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Obra Social:</p>
            <p className="appointmen-p-data">{obraSocial}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Plan:</p>
            <p className="appointmen-p-data">{plan}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Nombre:</p>
            <p className="appointmen-p-data">{localStorage.getItem("user_name")}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Apellido:</p>
            <p className="appointmen-p-data">{localStorage.getItem("user_lastName")}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Especialidad:</p>
            <p className="appointmen-p-data">{speciality}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Medico:</p>
            <p className="appointmen-p-data">{medic.name}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Fecha:</p>
            <p className="appointmen-p-data">{date}</p>
          </div>
          <div className="appointmen-section-div">
            <p className="appointmen-p-title">Horario:</p>
            <p className="appointmen-p-data">{time.value}</p>
          </div>
          

          </section>
    </div>
  );
  }
};

export default Appointment_resume;
