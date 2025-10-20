import { useEffect, useRef, useState } from 'react'
import '../pages/styles/profile.css'
import { data, useNavigate } from 'react-router-dom'
import alertify from 'alertifyjs';
import { useLanguage } from "../components/context/LanguageContext"
export default function Profile() {
    const { t } = useLanguage();
    const EMAILREGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        name: "",
        lastName: ""
    })
    const [articleId, setArticleId] = useState(1)
    const [isActive, setIsActive] = useState(true)
    const [newUserData, setNewUserData] = useState(userData)

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
                    console.log("Turnos:", appointmentsData);
                } else {
                    console.log("Error en appointments:", appointmentsData);
                }
            })
            .catch(e => console.error(e));
    }, []);


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
                        <li role='button' onClick={() => handleArticles(3)}><div><i className="fi fi-ss-clipboard-list"></i><p>{t("preferences") || "Preferences"}</p></div><i className={articleId == 3 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
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
                        <input type='button' value={t("edit") ||"Editar campos"} onClick={handleIsActive} />
                        <input type='button' value={t("aceptar")||"Aceptar cambios"} onClick={handleAcceptChanges} />
                    </article>
                    :
                    articleId == 2 ?
                        <article>
                            {t("appointments")}
                        </article>
                        :
                        <article>
                            {t("preferences")}
                        </article>
            }
        </section>
    )
}