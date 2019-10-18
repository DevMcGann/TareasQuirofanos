import React from 'react';

const Tarea = ({tarea,eliminaTarea,cambiarEstadoTarea,index}) => {

    const clickEliminar = e => {
        eliminaTarea(tarea.id)
        }

    const cambiarEstado = e => {
        
        if (tarea.complete === false){
            tarea.complete = true
        }else{
            tarea.complete = false
        }
        cambiarEstadoTarea(tarea,index)
    }



    return ( 
        <div className="tarea"  style={{ backgroundColor:  tarea.complete ? "green" : "red" }}>
                <h3> {tarea.nombre}</h3>
                <div className="botoneraTareas">
                    {tarea.complete ? (<i className="fas fa-check-circle"
                    onClick={cambiarEstado}>Completa</i>) : (<i className="fas fa-circle" onClick={cambiarEstado}>Incompleta</i>)}
                    <i className="fas fa-trash" onClick={clickEliminar}></i>
                </div>
                           
             </div>
     );
}
 
export default Tarea;

//<i class="fas fa-check-circle"></i>
//onClick={cambiarEstado}