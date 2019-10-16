import React from 'react';

const Tarea = ({tarea,eliminaTarea,cambiarEstadoTarea}) => {

    const clickEliminar = e => {
        eliminaTarea(tarea.id)
        }

    const cambiarEstado = e => {
        var nuevaTarea = tarea;
        eliminaTarea(tarea.id)
        if (nuevaTarea.complete === false){
            nuevaTarea.complete = true
        }else{
            nuevaTarea.complete = false
        }
        cambiarEstadoTarea(nuevaTarea)
    }

    return ( 
        <div className="tarea"  style={{ backgroundColor:  tarea.complete ? "green" : "red" }}>
                <h3> {tarea.nombre}</h3>
                <button onClick={cambiarEstado}>Completar</button> 
                <button onClick={clickEliminar}> Eliminar </button>           
             </div>
     );
}
 
export default Tarea;