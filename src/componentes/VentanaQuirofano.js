import React,{useState,useEffect} from 'react';
import uuid from 'uuid';
import Tarea from './Tarea'



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
            idQuirofano: quirofano.id,
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

    const cambiarEstadoTarea = (tarea,index) => {
        
        const tareaModificada = tarea
        const indiceOriginal = index
        const copiaArray = [...tareasArray]
        var newArray = copiaArray.filter(function (tar) {
            return tar.id !== tarea.id 
          });
        newArray.splice(indiceOriginal,0, tareaModificada)
        setTareasArray(newArray)

    }

  
    const todasIncompletas= e=> {
         const copiaArray = [...tareasArray]
         copiaArray.map(tarea => (
             tarea.complete=false
         ))
         setTareasArray(copiaArray)

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
                <button onClick={todasIncompletas}>Marcar todas Incompletas</button>
            </div>

            {!tareasArray.length ? (<p>No hay tareas</p>) : (
                 <div className="listaTareas">
                        <h2>Tareas de {nombreQuirofano}</h2>
                        
                     {tareasArray.map((tarea,index) => tarea.idQuirofano === quirofano.id ? (
                         <Tarea 
                             key={index}
                             tarea={tarea}
                             id={tarea.id}
                             eliminaTarea={eliminaTarea}
                             cambiarEstadoTarea={cambiarEstadoTarea} 
                             index={index}
                             
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