import React from 'react';
import './App.css';
import ListaQuirofanos from './componentes/ListaQuirofanos';


function App() {
  return (
    <div className="App">
    
        <React.Fragment>
          <div className="header">
            <img src={"img/n.png"} alt="nick"/>
            <h1>Administrador de Tareas de Quirófanos</h1>
          </div>
          <ListaQuirofanos/>

        </React.Fragment>
    </div>
  );
}

export default App;
