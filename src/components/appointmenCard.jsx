import alertify from "alertifyjs";
import "../components/styles/appointmenCard.css"
import "../pages/styles/profile.css"
import { useLanguage } from "./context/LanguageContext";
import Swal from "sweetalert2";

const AppointmenCard = ({ dependency, status, id, time, date, specialist, role }) => {
    const { t } = useLanguage();

    const handleStatus = async () => {

        const result = await Swal.fire({
            title: 'Cancelar turno?',
            text: 'Esta acción no se puede alternar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;
        await fetch(`http://localhost:3000/appointment/cancel/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(data => data.json())
            .then(res => {
                if (res.ok) {
                    alertify.success("Turno cancelado correctamente");
                    dependency(prevData => !prevData);
                } else {
                    alertify.error("No se pudo cancelar el turno");
                }
            })
            .catch(err => {
                console.error(err);
                alertify.error("Error de conexión");
            });

    }

    return (
        <div className={status ? "appointment_div" : "appointment_div_cancel"} onClick={handleStatus}>
            <div className="hover_cancel">Cancelar turno</div>
            <p>{t("date_appointment")}: <span>{date}</span></p>
            <p>{t("time_appointment")}: <span>{time.time}</span></p>
            <p>{role === 2 ? t("patient_appointment") : t("specialist_appointment")}:<span>{specialist.name + " " + specialist.lastName}</span></p>
            <p className="status_p">{status ? "Activo" : "Cancelado"}</p>
        </div>
    )
}

export default AppointmenCard;