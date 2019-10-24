import React from 'react';
import Logo from '../../packs/images/logo.png';

const Home = (props) => {
  return (
    <div className="jumbotron">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div className="instructions">
        <p>
          El juego consiste en despejar todas las casillas de una pantalla que no oculten una mina.
        </p>
        <p>
          Algunas casillas tienen un número, este número indica las minas que son en todas las casillas circundantes.
        </p>
        <p>
            Así, si una casilla tiene el número 3, significa que de las ocho casillas que hay alrededor
          (si no es en una esquina o borde) hay 3 con minas y 5 sin minas. Si se descubre una casilla
          sin número indica que ninguna de las casillas vecinas tiene mina y estas se descubren automáticamente.
        </p>
        <p>
            Si se descubre una casilla con una mina se pierde la partida.
        </p>
        <p>
            Se puede poner una marca en las casillas que el jugador piensa que hay minas para ayudar a descubrir la que están cerca.
        </p>
      </div>
    </div>
  );
};

export default Home;