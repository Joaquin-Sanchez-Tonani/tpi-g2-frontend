import "../components/styles/appointmenCard.css"
import "../pages/styles/profile.css"

const AppointmenCard = ({ id, time, date, specialist, role }) => {
    id

    return (
        <div className="appointmen_div">
            <section className="appointmen_div_section_time">               
                <h3>{date}</h3>
                <h3>{time.time}</h3>   
                            <div class="outer">
            <div class="inner"></div>
            </div>            
            </section>

            <section className="appointmen_div_section_data">      
                <p>{role === "patient" ? 'PACIENTE:' : "MEDICO:"}</p>
                <h3>{specialist.name + " " + specialist.lastName}</h3>
            </section>
        </div>
    )
}







export default AppointmenCard; 