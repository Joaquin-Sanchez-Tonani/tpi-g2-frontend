import './styles/specialistCard.css'


export const SpecialistCard = ({id, name, speciality, img}) => {
    id
    return(
        <article className="specialist-card-article">
            <img className='specialist-card-img' src={img} alt={'Imagen de '+ name} />
            <div>
                <h2>{name}</h2>
               <li>{speciality}</li>
            </div>
        </article>

    )

}