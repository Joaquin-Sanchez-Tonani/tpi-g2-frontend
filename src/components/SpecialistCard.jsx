import './styles/specialistCard.css'
import { useLanguage } from "./context/LanguageContext"

export const SpecialistCard = ({ id, name, specialty, licenseNumber, email }) => {
    id
    const { t } = useLanguage();
    return (
        <article className="specialist-card-article">
            <div className="specialist-card-content">
                <h2 className="specialist-name">{name}</h2>
                <ul className="specialist-info">
                    <li className="specialist-license">{t("nro_mtc") || "Numero de matricula"}:<strong> {licenseNumber}</strong></li>
                    <li className="specialist-specialty">{t("Specialty")||"Especialidad"}:<strong> {specialty}</strong></li>
                    <li className="specialist-email">{t("contact_email") || "Correo electronico"}:<strong> {email}</strong></li>
                </ul>
            </div>
        </article>


    )

}