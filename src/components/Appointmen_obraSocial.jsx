 const Appointmen_obraSocial = ({addObraSocial, addPlanSocial}) => {

 const handleClickObraSocial = (event) => {
     addObraSocial(event.target.value)
 }

 const handleClickPlan = (event) => {
    addPlanSocial(event.target.value)
 }

    return (
        <div className="Appointmen-Contenedor">


                    <select value="Especialidad" onChange={handleClickObraSocial}>
                <option value=""  hidden>
                    Elige una obra social:
                </option>
                <option value="Obra social 1">Obra social 1</option>
                <option value="Obra social 2">Obra social 2</option>
                <option value="Obra social 3">Obra social 3</option>
                <option value="Obra social 4">Obra social 4</option>
                    </select>
                    <select value="Obra-social" onChange={handleClickPlan}>
                        <option hidden selected>Seleccione plan:</option>
                        <option value="1" >plan 1</option>
                        <option value="2">Obra social 2</option>
                        <option value="3">Obra social 3</option>
                        <option value="4">Obra social 4</option>
                    </select>

                    <button onclick="">Seleccionar</button>
                   
        </div>
    )

}

export default Appointmen_obraSocial

