import './styles/specialistCard.css'


export const SpecialistCard = ({id, name, specialty, img}) => {
    id
    return(
        <article className="specialist-card-article">
            <img className='specialist-card-img' src={img} alt={'Imagen de '+ name} />
            <div>
                <h2>{name}</h2>
               {specialty.map((e, index) => <li key={index}>{e}</li>)} 
            </div>
        </article>

    )

}