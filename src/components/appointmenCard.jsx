import "../components/styles/appointmenCard.css"
import "../pages/styles/profile.css"

const AppointmenCard = ({ id, time, date, specialist, specialty }) => {
    return (
        <div className="appointmen_div">
            <h2>{time.time + " " + date}</h2>
            <ul className='info-profile-card'>
                <span className='lines'></span>
            </ul>
            <h3>{specialist.name + " " + specialist.lastName}</h3>
        </div>
    )
}

export default AppointmenCard;