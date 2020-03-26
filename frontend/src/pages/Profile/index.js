import React, { useEffect, useState } from 'react';
// useEffect -> disparar uma função em determinado momento do componente

import logoImg from '../../assets/logo.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './style.css';
import api from '../../services/api';


export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    useEffect(function()
     {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then((response) => {
          setIncidents(response.data);
        });
    }, [ongId]) // funcao a ser executada / quando executar. se [] = uma vez
    // exemplo -  [ ongName ] sempre que conteudo ongName mudar, executa a funcao

    async function handleDeleteIncident(incidentId) {
        try {
            await api.delete(`/incidents/${incidentId}`, {
                headers : {
                    Authorization : ongId
                }
            });
            // Atualiza os incidents exbibidos na pagina com todos menos o removido.
            setIncidents(incidents.filter(incident => incident.id !== incidentId));
        }
        catch(error) {
            console.log('Erro ao deletar caso, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={ handleLogout }>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {
                incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
    
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
    
                        <strong>VALOR:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }</p>
    
                        <button onClick={ () => handleDeleteIncident(incident.id) }>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))
                }
            </ul>
        </div>
    );
}