import { useEffect, useState } from 'react'
import '../pages/styles/profile.css'
import { useNavigate } from 'react-router-dom'
import alertify from 'alertifyjs';
import { useLanguage } from "../components/context/LanguageContext"
import AppointmenCard from '../components/appointmenCard'

export default function Profile() {
    const { t } = useLanguage();
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        lastName: "",
        role_id: ""
    })
    const [articleId, setArticleId] = useState(1)
    const [isActive, setIsActive] = useState(true)
    const [newUserData, setNewUserData] = useState(userData)
    const [appointmen, SetAppointmen] = useState([])
    const [handleChanges,setHandleChanges] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("token");
        Promise.all([
            fetch("http://localhost:3000/profile/user/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            }),
            fetch("http://localhost:3000/profile/appointments/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
        ])
            .then(async ([userRes, appointmentsRes]) => {
                const userData = await userRes.json();
                const appointmentsData = await appointmentsRes.json();

                if (userData.ok) {
                    setUserData(userData.user);
                    setNewUserData(userData.user);
                } else {
                    console.log("Error en user:", userData);
                }

                if (appointmentsData.ok) {
                    const sorted = appointmentsData.appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
                    SetAppointmen(sorted)
                } else {
                    console.log("Error en appointments:", appointmentsData);
                }
            })
            .catch(e => console.error(e));
    }, [handleChanges]);


    function handleArticles(value) {
        const id = value
        if (id == 4) {
            localStorage.clear()
            navigate("/login")
        }
        setArticleId(id)
    }
    function handleUserData(e) {
        var { name, value } = e.target

        setNewUserData(
            prevData => ({
                ...prevData, [name]: value
            })
        )
    }

    function handleIsActive() {
        setIsActive(!isActive)
    }

    function handleAcceptChanges() {
        if (!newUserData.name) {
            alertify.error("Ingrese su nombre");
            return;
        }
        if (!newUserData.lastName) {
            alertify.error("Ingrese su apellido");
            return;
        }

        fetch("http://localhost:3000/profile/user/", {
            method: "PATCH",
            body: JSON.stringify({ name: newUserData.name, lastName: newUserData.lastName }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(data => data.json())
            .then(res => {
                console.log(res)
                alertify.success("Cambios confirmados")
                setUserData(newUserData)
                localStorage.setItem("user_name", newUserData.name)
                return res
            })
            .catch(e => console.log(e))
    }
    return (
        <section className='profile'>
            <aside>
                <nav>
                    <ul>
                        <li role='button' onClick={() => handleArticles(1)}><div><i className="fi fi-sr-user-vneck-hair"></i><p>{t("my_profile") || "My profile"}</p></div><i className={articleId == 1 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
                        <li role='button' onClick={() => handleArticles(2)}><div><i className="fi fi-ss-clipboard-list"></i><p>{t("appointments") || "Appointments"}</p></div><i className={articleId == 2 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
                        <li role='button' onClick={() => handleArticles(4)}><div><i className="fi fi-sc-sign-out-alt"></i><p>{t("logout") || "Log out"}</p></div></li>
                    </ul>
                </nav>
            </aside>
            {
                articleId == 1 ?
                    <article className='profile-card'>
                        <div className='user-profile-card'>
                            <h3>{userData.name + " " + userData.lastName || ""}</h3>
                            <h5>{userData.email || ""}</h5>
                        </div>
                        <ul className='info-profile-card'>
                            <span className='lines'></span>
                            <li><strong>{t("name")}</strong><input name='name' onChange={handleUserData} type="text" value={newUserData.name} disabled={isActive} /></li>
                            <span className='lines'></span>
                            <li><strong>{t("lastname")}</strong><input name='lastName' onChange={handleUserData} type="text" value={newUserData.lastName} disabled={isActive} /></li>
                        </ul>
                        <div className='div_profile_buttons'>
                            <input className='profile_buttons' type='button' value={t("edit") || "Editar campos"} onClick={handleIsActive} />
                            <input className='profile_buttons' type='button' value={t("aceptar") || "Aceptar cambios"} onClick={handleAcceptChanges} />
                        </div>
                    </article>
                    :
                    articleId == 2 ?
                        <article className='appointment-cards'>
                            {appointmen.length != 0 ?
                                appointmen.map((e) => {
                                    return (
                                        <AppointmenCard
                                            dependency={setHandleChanges}
                                            status={e.status}
                                            key={e.id}
                                            id={e.id}
                                            time={e.Time}
                                            date={e.date}
                                            specialist={newUserData.id !== e.patient_id ? e.patient : e.specialist}
                                            role={newUserData.id === e.patient_id ? 1 : newUserData.role_id}
                                            />

                                    )
                                }) : "No hay turnos "}                         </article>
                        :
                        <article>
                            {t("preferences")}
                        </article>
            }
        </section>
    )
}