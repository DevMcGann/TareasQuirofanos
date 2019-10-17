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
    //const filtrado = tareasArray.filter(tarea => tarea.idQuirorano === quirofano.id)
    


    const handleSubmit = e => {
        e.preventDefault();
        const tarea= {
            id:uuid(),
            idQuirorano: quirofano.id,
            nombre:tareaNueva,
            complete: false
        
        }
        setTareasArray([...tareasArray,tarea])
        setTareaNueva("")
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
        const copiaArray = [...tareasArray]
        var newArray = copiaArray.filter(function (tar) {
            return tar.id !== tarea.id 
          });
        //newArray.push(tareaModificada)
        setTareasArray([...newArray, tareaModificada])

    }

    //experimental//
    
    const handleCambiarEstado = id => {
        const findTask = tareasArray.find(tarea => tarea.id === id);
       
        const taskUpdated = {
            ...findTask,
            complete: true
        };
        setTareasArray([...tareasArray, taskUpdated]);
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
                        
                     {tareasArray.map((tarea,index) => tarea.idQuirorano === quirofano.id ? (
                         <Tarea 
                             key={index}
                             tarea={tarea}
                             id={tarea.id}
                             eliminaTarea={eliminaTarea}
                             cambiarEstadoTarea={cambiarEstadoTarea} 
                             handleCambiarEstado={handleCambiarEstado}
                            />
                        ):(null)
                        )}
                
                </div>
            )}
        </div>
        </React.Fragment>
     );
}
 
export default VentanaQuirofano;