import React from 'react';

const VentanaQuirofano = ({quirofanoClicado}) => {

    const {quirofano} = quirofanoClicado

    return ( 
        <h1>{quirofano.nombre}</h1>
     );
}
 
export default VentanaQuirofano;