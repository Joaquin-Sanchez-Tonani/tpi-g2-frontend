import './styles/specialistCard.css'


export const SpecialistCard = ({ id, name, specialty, licenseNumber, email }) => {
    id
    return (
        <article className="specialist-card-article">
            <div className="specialist-card-content">
                <h2 className="specialist-name">{name}</h2>
                <ul className="specialist-info">
                    <li className="specialist-license">Numero de matricula: <strong>{licenseNumber}</strong></li>
                    <li className="specialist-specialty">Especialidad: <strong>{specialty}</strong></li>
                    <li className="specialist-email">Correo electronico: <strong>{email}</strong></li>
                </ul>
            </div>
        </article>


    )

}