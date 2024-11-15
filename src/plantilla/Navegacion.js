import React from 'react';
import escudo from './img/escudo.png'; // Imagen del escudo (parte izquierda)
import textoCentro from './img/textoCentro.png'; // Imagen del texto central
import alcaldiaIquira from './img/alcaldiaIquira.png'; // Imagen de "Alcaldía de Íquira" (parte derecha)

export default function Navegacion() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '150px', // Ajusta la altura según tus necesidades
            backgroundColor: '#fff',
            padding: '0 10px' // Añade un pequeño espacio para que el contenido no toque los bordes
        }}>
            {/* Sección izquierda - Escudo */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%' }}>
                <img 
                    src={escudo} 
                    alt="Escudo Íquira" 
                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                />
            </div>

            {/* Sección central - Texto */}
            <div style={{ flex: 2, display: 'flex', justifyContent: 'center', height: '100%' }}>
                <img 
                    src={textoCentro} 
                    alt="Texto Íquira" 
                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                />
            </div>

            {/* Sección derecha - Alcaldía de Íquira */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', height: '100%' }}>
                <img 
                    src={alcaldiaIquira} 
                    alt="Alcaldía de Íquira" 
                    style={{ maxHeight: '100%', objectFit: 'contain' }}
                />
            </div>
        </nav>
    );
}
