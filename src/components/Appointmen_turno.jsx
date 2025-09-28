

import './styles/appointmen.css'
import Calendar from 'react-calendar';
import { useState } from 'react';


import 'react-calendar/dist/Calendar.css';

const Appointmen_turno = ({ isRender }) => {




  const VALOR_RENDER = 3; 
    
    const [value, onChange] = useState(new Date());

  if(isRender != VALOR_RENDER){
    return null
  } else {
     return (
    <div className='appointmen_container'>


      <Calendar onChange={onChange} value={value} />
    </div>
  );
  }
};

 export default Appointmen_turno;
