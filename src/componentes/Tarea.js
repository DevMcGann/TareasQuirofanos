import React from 'react';

const Tarea = ({tarea,eliminaTarea,cambiarEstadoTarea,handleCambiarEstado}) => {

    const clickEliminar = e => {
        eliminaTarea(tarea.id)
        }

    /*const cambiarEstado = e => {
        
        if (tarea.complete === false){
            tarea.complete = true
        }else{
            tarea.complete = false
        }
        cambiarEstadoTarea(tarea)
    }*/

    const handleUpdateStatus = e => {
        handleCambiarEstado(tarea.id)
    }

    return ( 
        <div className="tarea"  style={{ backgroundColor:  tarea.complete ? "green" : "red" }}>
                <h3> {tarea.nombre}</h3>
                <button onClick={handleUpdateStatus}>Completar</button> 
                <button onClick={clickEliminar}> Eliminar </button>           
             </div>
     );
}
 
export default Tarea;