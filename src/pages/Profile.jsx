import { useState } from 'react'
import '../pages/styles/profile.css'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
    const name = localStorage.getItem("user_name") + " " + localStorage.getItem("user_lastName")
    const email = localStorage.getItem("user_email")
    const [articleId, setArticleId] = useState(1)
    let navigate = useNavigate();
    function handleArticles(value) {
        const id = value
        if(id == 4){
            localStorage.clear()
            navigate("/login")
        }
        setArticleId(id)
    }
    return (
        <section className='profile'>
            <aside>
                <nav>
                    <ul>
                        <li role='button' onClick={() => handleArticles(1)}><div><i className="fi fi-sr-user-vneck-hair"></i><p>My profile</p></div><i className={articleId == 1 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
                        <li role='button' onClick={() => handleArticles(2)}><div><i className="fi fi-ss-clipboard-list"></i><p>Appointments</p></div><i className={articleId == 2 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
                        <li role='button' onClick={() => handleArticles(3)}><div><i className="fi fi-ss-clipboard-list"></i><p>Preferences</p></div><i className={articleId == 3 ? "fi fi-sr-angle-right active-i" : "fi fi-sr-angle-right no-active-i"}></i></li>
                        <li role='button' onClick={() => handleArticles(4)}><div><i className="fi fi-sc-sign-out-alt"></i><p>Log out</p></div></li>
                    </ul>
                </nav>
            </aside>
            {
                articleId == 1 ?
                    <article className='profile-card'>
                        <div className='user-profile-card'>
                            <h3>{name}</h3>
                            <h5>{email}</h5>
                        </div>
                        <ul className='info-profile-card'>
                            <span className='lines'></span>
                            <li><strong>Name</strong><span>your name</span></li>
                            <span className='lines'></span>
                            <li><strong>Email account</strong><span>yourname@mail.com</span></li>
                            <span className='lines'></span>
                            <li><strong>Number</strong><span>add number</span></li>
                        </ul>
                    </article>
                    :
                    articleId == 2 ?
                    <article>
                        Appointments
                    </article>
                    :
                    <article>
                        Preferences
                    </article>
            }
        </section>
    )
}