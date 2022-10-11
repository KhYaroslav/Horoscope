import React from 'react';
import axios from 'axios';
import './App.css';


const { useState } = React;
console.log(useState);

const Main = () => {
  
  const getRead = (sign = 'gemini') => {
    axios.post(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`)
    .then(response => {
        console.clear();
        console.log(response.data);
        setRead(response.data);
        setLoading(false)
      });
    }
  
  const [sign, setSign] = useState();
  const [read, setRead] = useState();
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  
  const handleSelect = (e) => {
    console.log(e.target.value);
    setLoading(true);
    setSign(e.target.value);
    getRead(e.target.value);
    setShowCard(true);
  }
  
  return (
    <div className='main'>
      <h2 className='head'>Гороскоп</h2>
      <div className='sign select'>
        <select onChange={handleSelect}>
          <option value="" disabled selected>Выберите знак</option>
          <option value='aquarius'>Водолей</option>
          <option value='pisces'>Рыбы</option>
          <option value='taurus'>Телец</option>
          <option value='gemini'>Близнецы</option>
          <option value='cancer'>Рак</option>
          <option value='leo'>Лев</option>
          <option value='virgo'>Дева</option>
          <option value='libra'>Весы</option>
          <option value='scorpio'>Скорпион</option>
          <option value='sagittarius'>Стрелец</option>
          <option value='capricorn'>Козерог</option>
        </select>
      </div>
      <div className='card-box'>
        {loading ? <Loader /> : (showCard ? <Card {...read} sign={sign} /> : null)}
      </div>
      </div>
      
  )
}

const Card = props => {
  console.log(props)
  return (
    <article className='card'>
      <div className='card-a'>
        <h1>{props.sign}</h1>
        <h2>Сегодня: {props.current_date}</h2>
      </div>
      <div className='card-c'>
        <p>{props.description}</p>
      </div>
      <div className='card-d'>
        <span>Совместимость: <div>{props.compatibility}</div></span>
        <span>Настроение: <div>{props.mood}</div></span>
        <span>Цвет настроения: <div>{props.color}</div></span>
        <span>Счастливый номер: <div>{props.lucky_number}</div></span>
        <span>Удачное время: <div>{props.lucky_time}</div></span>
      </div>
      <p className='card-e'>Возвращайтесь завтра</p>
    </article>
  )
}

const Loader = props => {
    console.log(props);
  return (
    <div className='loader'>
      Загрузка...
      <i class="fas fa-sync-alt fa-spin"></i>
    </div>
  )
}

export default Main;
