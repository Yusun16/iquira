import React from 'react';
import escudo from './img/escudo.png'; // Imagen del escudo (parte izquierda)
import textoCentro from './img/textoCentro.png'; // Imagen del texto central
import alcaldiaIquira from './img/alcaldiaIquira.png'; // Imagen de "Alcaldía de Íquira" (parte derecha)

export default function Navegacion() {
    return (
        <nav 
            className="navbar navbar-expand-lg navbar-light" 
            style={{ backgroundColor: '#fff', padding: '0 10px', height: 'auto' }} // Ajusta altura dinámica
        >
            <div className="container-fluid d-flex align-items-center justify-content-between">
                {/* Sección izquierda - Escudo */}
                <div className="d-flex justify-content-center flex-grow-1 flex-md-grow-0" style={{ height: '100%' }}>
                    <img 
                        src={escudo} 
                        alt="Escudo Íquira" 
                        style={{ maxHeight: '150px', objectFit: 'contain', width: 'auto' }}
                    />
                </div>

                {/* Sección central - Texto */}
                <div 
                    className="d-flex justify-content-center flex-grow-2 flex-md-grow-1" 
                    style={{ height: '100%' }}
                >
                    <img 
                        src={textoCentro} 
                        alt="Texto Íquira" 
                        style={{ maxHeight: '150px', objectFit: 'contain', width: 'auto' }}
                    />
                </div>

                {/* Sección derecha - Alcaldía de Íquira */}
                <div className="d-flex justify-content-center flex-grow-1 flex-md-grow-0" style={{ height: '100%' }}>
                    <img 
                        src={alcaldiaIquira} 
                        alt="Alcaldía de Íquira" 
                        style={{ maxHeight: '150px', objectFit: 'contain', width: 'auto' }}
                    />
                </div>
            </div>
        </nav>
    );
}
