import { useLanguage } from "../context/LanguageContext"
export const Welcome = () => {
   const { t } = useLanguage();
    return(
        <div className="welcome-div">
            <h3 className="welcome-h3">{t("welcome")|| "Bienvenido"} {localStorage.getItem('user_name')}!</h3>
        </div>
    )
}