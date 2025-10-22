import './styles/servicecard.css'
import Accordion from 'react-bootstrap/Accordion';
import { useLanguage } from './context/LanguageContext';
const ServiceCard = ({ title, description,  }) =>{
  const {t} = useLanguage();
    return(
        // <article className='service-card-article'>
        //     <div>
        //         <img className="service-card-article-img" src={image} alt={title} />
        //         {icon}
        //     </div>
        //     <h3 className="service-card-article-h3">{title}</h3>
        //     <p className="service-card-article-p">{description}</p>
        // </article>
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>{t(title)}</Accordion.Header>
        <Accordion.Body>
          {t(description)}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    )

}






export default ServiceCard
