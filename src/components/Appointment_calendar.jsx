import { useEffect, useState } from 'react';
import './styles/appointment.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentCalendar = ({addTime ,date, busyAppointment, addSchedule, isRender }) => {
  const VALOR_RENDER = 3;

  if (isRender !== VALOR_RENDER) {
    return null;
  }

  const [times, setTimes] = useState({ times: [] });

  async function fetchTimes() {
    const data = await fetch(`http://localhost:3000/appointment/times`);
    const res = await data.json();
    setTimes(res);
  }

  useEffect(() => {
    fetchTimes();
  }, []);




  return (
    <div className="appointment_container">
      <Calendar
        onChange={addSchedule}
        tileDisabled={({ date }) => {
          const fechaConUnDia = new Date(date);
          fechaConUnDia.setDate(fechaConUnDia.getDate() - 1);
          return fechaConUnDia < new Date().setHours(0, 0, 0, 0);
        }}
      />

      <select onChange={addTime} defaultValue="0" disabled={!date}>
        <option value="0" disabled>Elegir horario</option>
        {times.times.map(({ id, time }) => (
          <option disabled={busyAppointment.some((ap) => ap.time_id == id) ? true : false} key={id} value={id}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppointmentCalendar;
