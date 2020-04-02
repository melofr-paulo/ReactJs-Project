import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import api from '../../Services/api';

export default function Logon(){
  
  const [id, setID] = useState('');
  const history = useHistory();
  
  async function handleLogin(e){
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongID', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/profile')
    } catch (error) {
      alert('Falha no login, tente novamente!');
    }

  }


  return (
    <div className="logon-container">
      <section className="form">
        <img src= {logoImg} alt="Be The Hero"/>
        <form onSubmit = {handleLogin}>
            <h1>Faça seu Logon</h1>

            <input
              placeholder=" Sua ID"
              value={id}
              onChange = {e => setID(e.target.value)}
            />
            <button className="button" type="submit">Entrar</button>

            <Link className="back-link" to="/register">
              < FiLogIn size={18} color="#e02041" />
              Não tenho cadastro
            </Link>
        </form>
      </section>

      <img src= { heroesImg} alt="Heroes"/>
    </div>
  );
}