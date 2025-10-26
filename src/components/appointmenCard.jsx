import "../components/styles/appointmenCard.css"
import "../pages/styles/profile.css"

const AppointmenCard = ({ time, date, specialist, special }) => {

const specialty  = (special.filter((e) => e.id == specialist.specialty_id)[0].specialty);

    return (
        <div className="appointmen_div">
            <section className="appointmen_div_section">
                <h2 className="appointmen_div_section_time">{time.time}</h2>
                <h2>{date}</h2>
            </section>
            <ul className='info-profile-card'>
                <span className='lines'></span>
            </ul>
            <h3>{specialist.name + " " + specialist.lastName}</h3>
            <h4>{specialty}</h4>
        </div>
    )
}

export default AppointmenCard; 