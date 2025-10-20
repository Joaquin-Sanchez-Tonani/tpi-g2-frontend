import './styles/appointment.css'
import { useLanguage } from "../components/context/LanguageContext"; 

const Appointment_obraSocial = ({ addObraSocial, addPlanSocial, isRender }) => {
  const VALOR_RENDER = 1; 
  const { t } = useLanguage(); 

  const handleClickObraSocial = (event) => {
    addObraSocial(event.target.value);
  };

  const handleClickPlan = (event) => {
    addPlanSocial(event.target.value);
  };

  if (isRender != VALOR_RENDER) {
    return null;
  } else {
    return (
      <div className='appointmen_container'>
        <select defaultValue="0" className="form-select appointmen-select" onChange={handleClickObraSocial}>
          <option value="0" disabled hidden>
            {t("choose_health_insurance")}
          </option>
          <option value="Obra social 1">{t("health_insurance_1")}</option>
          <option value="Obra social 2">{t("health_insurance_2")}</option>
          <option value="Obra social 3">{t("health_insurance_3")}</option>
          <option value="Obra social 4">{t("health_insurance_4")}</option>
        </select>

        <select defaultValue="0" className="form-select appointmen-select" onChange={handleClickPlan}>
          <option value="0" disabled hidden>
            {t("select_plan")}
          </option>
          <option value="1">{t("plan_1")}</option>
          <option value="2">{t("plan_2")}</option>
          <option value="3">{t("plan_3")}</option>
          <option value="4">{t("plan_4")}</option>
        </select>
      </div>
    );
  }
};

export default Appointment_obraSocial;
