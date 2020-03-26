import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi';

import './style.css';
import api from '../../services/api';


export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        }
        // Adiciona no banco pela API
        api.post('/incidents', data, {
            headers : {
                Authorization : ongId
            }
        });
        // Devolve para a rota /profile
        history.push('/profile');

    }

    return ( 
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>Voltar para home
                    </Link>

                </section>
                <form onSubmit={ handleNewIncident }>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value) }
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}