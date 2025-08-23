import './styles/servicecard.css'

const ServiceCard = ({ title, description, icon}) =>{
    return(
        <article className='service-card-article'>
            <div>
                <img className="service-card-article-img"  alt={title} />
                {icon}
            </div>
            <h3 className="service-card-article-h3">{title}</h3>
            <p className="service-card-article-p">{description}</p>
        </article>
    )
}

export default ServiceCard