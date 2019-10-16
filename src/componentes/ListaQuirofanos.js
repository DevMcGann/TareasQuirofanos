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

    const eliminarQuirofano = index => {
        const nuevosQuirofanos = [...quirofanosArray];
        nuevosQuirofanos.splice(index, 1);
        setQuirofanosArray(nuevosQuirofanos);
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
              <div className="header">
                <h1>Administrador de Tareas</h1>
              </div>
        <Router>
            <Switch>
                <Route exact path="/" render={() => (
                    <React.Fragment>
                    <div className="formNuevoQuirofano">
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Nuevo Quirofano"
                            onChange={(e) => setNuevoQuirofano(e.target.value)} required
                            value={nuevoQuirofano}/>
                        </form>
                    </div>


                    {quirofanosArray.length ? (
                            <div className="listaQuirofanos">
                                <h2>Personas</h2>
                            {quirofanosArray.map((quirofano, index ) => (
                                <Quirofano 
                                    key={index}
                                    index={index}
                                    quirofano={quirofano}
                                    id={quirofano.id}
                                    eliminarQuirofano={eliminarQuirofano}
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