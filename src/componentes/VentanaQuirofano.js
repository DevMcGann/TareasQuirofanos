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


    const eliminarTarea = index => {
        const nuevasTareas = [...tareasArray];
        nuevasTareas.splice(index, 1);
        setTareasArray(nuevasTareas);
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
                        
                     {tareasArray.map((tarea, index ) => (
                         <Tarea 
                             key={index}
                             index={index}
                             tarea={tarea}
                             id={tarea.id}
                             eliminarTarea={eliminarTarea}    
                    />
                ))}
                
                </div>
            )}
        </div>
        </React.Fragment>
     );
}
 
export default VentanaQuirofano;