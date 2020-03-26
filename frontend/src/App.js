import React, {useState } from 'react';

import './global.css';
import Routes from './routes'; 
//import Logon from './pages/Logon'; // Automaticamente procura o index

function App() {
  return(
    <Routes />
  );
}

// JSX => Javascript XML  => nome dado para quando é passado HTML dentro do JS
export default App;




/*
    <Header titulo="Be The Hero"/> -> acesso pelo properties.titulo
*/

/*
    <Header>
      oi ---> acesso pelo properties.children
    </Header>
*/