import React from 'react';

const Tarea = ({eliminarTarea,tarea,index}) => {

    const clickEliminar = e => {
        eliminarTarea(index)
    }

    return ( 
        <div className="quirofano">
                <h3> {tarea.nombre}</h3> 
                <button onClick={clickEliminar}> X </button>           
             </div>
     );
}
 
export default Tarea;