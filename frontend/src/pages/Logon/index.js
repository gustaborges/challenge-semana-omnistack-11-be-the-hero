import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom'; // Link substitui a tag <a>, e não faz recarregar a página.
import './style.css';
// Imagens
import { FiLogIn } from 'react-icons/fi'; // Feather Icon => npm install react-icons
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api'

function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogon(event) {
        event.preventDefault();
        try {
            const response = await api.post('/sessions', { id });
            //alert('Bem-vinda, ' + response.data.name);
            //Armazeno essas informações no localStorage do navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile'); // redireciono para rota profile
        }
        catch(error) {
            if (error.response.status === 401)
                alert('O ID informado é inválido')
            else
                alert('Ocorreu um problema ao logar.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value = {id}
                        onChange= { (e) => { setId(e.target.value) } }
                    />
                    <button type="submit" className="button">Entrar</button>
                    
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>Não tenho cadastro
                    </Link>
                    
                </form>
            </section>
            
            <img src= {heroesImg} alt="Heroes"/>
        </div>
        
    );
}

export default Logon;