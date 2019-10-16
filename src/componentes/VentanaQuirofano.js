import React,{useState,useEffect} from 'react';
import uuid from 'uuid';
import Tarea from './Tarea'


/*Probar:
El entrar a VentanaQuirofano, que cargue todas las tareas de LocalStaorage.
Crear otro Hook [tareasFiltradas] donde hacemod un filter de esa const con todas las tareas con tarea.idQuirofano === quirofano.id
Operar sobre ese Hook 
*/

const VentanaQuirofano = ({quirofanoClicado}) => {

    const {quirofano} = quirofanoClicado
    const nombreQuirofano = quirofano.nombre

    // cargar  de localstorage como state inicial
    let tareasIniciales = JSON.parse(localStorage.getItem('tareas'));

    if(!tareasIniciales) {
        tareasIniciales = [];
    }

    /************STATE************************** */
    const[tareasArray, setTareasArray] = useState(tareasIniciales)
    const[tareaNueva, setTareaNueva] = useState("")
    /************************************************ */

    //filtrar tareas del array de tareas, segun su idQuirofano == quirofano.id
    const filtrado = tareasArray.filter(tarea => tarea.idQuirorano === quirofano.id)
    


    const handleSubmit = e => {
        e.preventDefault();
        const tarea= {
            id:uuid(),
            idQuirorano: quirofano.id,
            nombre:tareaNueva,
            complete: false
        
        }
        setTareasArray([...tareasArray,tarea])
    }


    const eliminaTarea = id => {
        const nuevasTareas = [...tareasArray];
        var newArray = nuevasTareas.filter(function (tar) {
            return tar.id !== id 
          });
          setTareasArray(newArray)
    }

    const cambiarEstadoTarea = tarea => {
        const tareaModificada = tarea
        eliminaTarea(tarea.id)
        setTareasArray([...tareasArray,tareaModificada])
    }




      //guardar en LocalStorage
      useEffect(
        () => {
            let tareasIniciales = JSON.parse(localStorage.getItem('tareas'));
            if(tareasIniciales) {
              localStorage.setItem('tareas', JSON.stringify(tareasArray));
            } else {
              localStorage.setItem('tareas', JSON.stringify([]));
            }
        }, [tareasArray] )

    /***************************************************************R E T U R N*************************************************** */
    return ( 
        <React.Fragment>
        <div className="quirofanoSeleccionado">
            <h1>{nombreQuirofano}</h1>

            <div className="nuevaTarea">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nueva Tarea" 
                        onChange={(e) => setTareaNueva(e.target.value)} required
                        value={tareaNueva}
                    />
                </form>
            </div>

            {!tareasArray.length ? (<p>No hay tareas</p>) : (
                 <div className="listaTareas">
                        <h2>Tareas de {nombreQuirofano}</h2>
                     {filtrado.map((tarea, index ,id) => (
                         <Tarea 
                             key={index}
                             index={index}
                             tarea={tarea}
                             id={tarea.id}
                             //eliminarTarea={eliminarTarea}   
                             eliminaTarea={eliminaTarea}
                             cambiarEstadoTarea={cambiarEstadoTarea} 
                    />
                ))}
                
                </div>
            )}
        </div>
        </React.Fragment>
     );
}
 
export default VentanaQuirofano;