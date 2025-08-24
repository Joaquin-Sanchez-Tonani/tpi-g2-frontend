import './styles/specialistCard.css'


export const SpecialistCard = ({id, name, specialty, img}) => {
    id
    return(
        <article className="specialist-card-article">
            <div>
                <h1>{name}</h1>
               {specialty.map((e, index) => <li key={index}>{e}</li>)} 
            </div>
            <img className='specialist-card-img' src={img} alt={'Imagen de '+ name} />

        </article>

    )

}