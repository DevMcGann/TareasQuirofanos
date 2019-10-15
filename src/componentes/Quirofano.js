import React from 'react';
import {Link} from 'react-router-dom'

const Quirofano = ({quirofano, eliminarQuirofano,index, quirofanoSeleccionado}) => {
    
    const clickEliminar = e => {
        eliminarQuirofano(index)
    }

    const handleClick = (e) => {
        //console.log(quirofano)
        quirofanoSeleccionado(quirofano); //devolver callback a App
    }
    
    return ( 
        
            <div className="quirofano">
             <Link to={`/quirofano/${quirofano.id}`}>   <h3 onClick={handleClick}>{quirofano.nombre}</h3> </Link>
                <button onClick={clickEliminar}>Eliminar</button>           
             </div>
        
     );
}
 
export default Quirofano;