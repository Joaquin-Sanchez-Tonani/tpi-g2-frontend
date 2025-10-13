export const Welcome = () => {
    return(
        <div className="welcome-div">
            <h3 className="welcome-h3">Bienvenido {localStorage.getItem('user_name')}!</h3>
        </div>
    )
}