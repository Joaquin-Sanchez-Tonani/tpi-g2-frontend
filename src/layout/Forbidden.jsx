import './styles/pagenotfound.css'

const Forbidden = () => {
    return(
        <div className='error-content-bg'>
            <div className='error-content'>
                <h1>403 Forbidden</h1>
                <p>Lo sentimos, no tienes permisos.</p>
            </div>
        </div>
    )
}

export default Forbidden