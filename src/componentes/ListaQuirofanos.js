import React,{useState, useEffect} from 'react';
import uuid from 'uuid';
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom';

//comp
import Quirofano from './Quirofano'
import VentanaQuirofano from './VentanaQuirofano';

const ListaQuirofanos = () => {

    // cargar  de localstorage como state inicial
    let quirofanosIniciales = JSON.parse(localStorage.getItem('quirofanos'));

    if(!quirofanosIniciales) {
      quirofanosIniciales = [];
    }
  

    const [quirofanosArray, setQuirofanosArray] = useState(quirofanosIniciales)
    const [nuevoQuirofano, setNuevoQuirofano] = useState("")
    const [quirofanoClicado, setQuirofanoClicado] = useState({})
        
    const handleSubmit = e => {
        e.preventDefault();
        const quirofano= {
            id:uuid(),
            nombre:nuevoQuirofano
        
        }
        setQuirofanosArray([...quirofanosArray,quirofano])
        }



        
    const eliminarQuirofano2 = id => {
        eliminar_Tareas_Relacionadas(id)
        const nuevosQuirofanos = [...quirofanosArray];
        var newArray = nuevosQuirofanos.filter(function (quirofano) {
            return quirofano.id !== id 
          });
          setQuirofanosArray(newArray)
    }
    const eliminar_Tareas_Relacionadas = id => {
    
        let tareas = JSON.parse(localStorage.getItem('tareas'))
        let tareas_filtradas = tareas.filter( function (tarea){
            return tarea.idQuirofano !== id
        });
        localStorage.setItem('tareas', JSON.stringify(tareas_filtradas))
       }



      const quirofanoSeleccionado = quirofano => {
        setQuirofanoClicado({quirofano})
      }
    

      useEffect(
        () => {
            let quirofanosIniciales = JSON.parse(localStorage.getItem('quirofanos'));
            if(quirofanosIniciales) {
              localStorage.setItem('quirofanos', JSON.stringify(quirofanosArray));
            } else {
              localStorage.setItem('quirofanos', JSON.stringify([]));
            }
        }, [quirofanosArray] )


    return ( 
        <React.Fragment>
              
        <Router>
            <Switch>
                <Route exact path="/" render={() => (
                    <React.Fragment>
                    <div className="formNuevoQuirofano">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nuevo Quirofano"
                            onChange={(e) => setNuevoQuirofano(e.target.value)} required
                            value={nuevoQuirofano}
                            className="inputQuirofano"/>
                        </form>
                    </div>


                    {quirofanosArray.length ? (
                            <div className="listaQuirofanos">
                                <h2>Quirofanos</h2>
                            {quirofanosArray.map((quirofano, index ) => (
                                <Quirofano 
                                    key={index}
                                    index={index}
                                    quirofano={quirofano}
                                    id={quirofano.id}
                                    eliminarQuirofano2={eliminarQuirofano2}
                                    quirofanoSeleccionado={quirofanoSeleccionado}
                                    
                                />
                            ))}
                            
                        </div>
                    ) : (
                        <p>No hay Quirófanos</p>
                    )}
                    
                    </React.Fragment>
                 )} />

                <Route exact path ="/quirofano/:id" render={ ()=> (
                    <VentanaQuirofano 
                        quirofanoClicado={quirofanoClicado}
                    />
                )} />
                 
            </Switch>
        </Router>
        </React.Fragment>
     );
}
 
export default ListaQuirofanos;