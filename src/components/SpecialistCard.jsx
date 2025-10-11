import './styles/specialistCard.css'


export const SpecialistCard = ({id, name, speciality}) => {
    id
    return(
        <article className="specialist-card-article">
            <div>
                <h2>{name}</h2>
               <li>{speciality}</li>
            </div>
        </article>

    )

}