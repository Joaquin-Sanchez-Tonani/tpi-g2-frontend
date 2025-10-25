import { DATAtimes } from "../Data/timeData.js"
import "../components/styles/appointmenCard.css"
import "../pages/styles/profile.css"

const AppointmenCard = ({id, time, date, specialist, specialti}) =>{
    const timeFilter = DATAtimes.filter((e) => e.id == time)
    const specialData = specialti[0].specialty
    id
    return(

        <div className="appointmen_div">
            <h2>{timeFilter[0].value + " " + date}</h2>
                <ul className='info-profile-card'>
                                <span className='lines'></span>
                </ul>
            <h3>{ specialist.name + " " + specialist.lastName}</h3>
            <h5>{specialData}</h5>

        </div>




    )
}

export default AppointmenCard;