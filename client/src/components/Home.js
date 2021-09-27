import React, {useEffect} from 'react'
import axios from "axios"
import Alldates from './Alldates';

import styled from "styled-components";
const HomeStyled=styled.div`
    display: flex;
    flex-direction: column;
    background-image: url("https://media4.giphy.com/media/26h0qLFdOBklnBsyI/giphy.gif?cid=ecf05e47mvo029sm29nfbamw3ky73hxjx8jfv6wn4fgrg7rn&rid=giphy.gif&ct=g");
    background-size: 100% 75%;
    background-repeat: no-repeat;
    //background-position: center;
    align-items: center;
    justify-content: center;
    color: black;
    border: solid 0.5px;
    align-items: center;
    width: 100%;
    height: 1300px;
    color: white;
    font-weight: bold;

.container{
   display: flex;
   flex-direction: column;
     align-items: center;
    border:solid 1px;
    width: 100%;
    height: 100%;
}
.details{
  align-items: center;
}

.but{
            background-color:#6f5b80;
            color: white;
            padding: 1rem;
            font-weight: bold;
            display: block;
            padding: 0.5rem 1rem;
            transition: 0.3s linear;
            border-radius: 5px;
        
        &:hover{
            background-color: #7e24ec;
            color: #222826;   
        }
}
  
   
`

export default function Home() {
const [data,setData] = React.useState([])

  useEffect(() => {
    const response = axios.get('http://localhost:3001/dates');
     response.then(data =>{  
         //console.log(data.data)
         setData(data.data)
 }
) 
}, [])
  
  const date = () =>{
    window.location.href="/date"
  }
  const allDates = () =>{
    window.location.href="/alldates"
  }

  return (
          <HomeStyled>
            <div className="container">
            <h1 className="welcome"> Bienvenido al registro de citas con la muerte</h1>
            <br/>
            <div className="details"> Aqui podra registrar su cita para la muerte lo visite de manera planificada</div>
            <br/>
            <div className="details">Puede revisar mas detalles o comenzar a agendar su cita</div>
            <br/>
            <button className="but" onClick={date}>Agendar cita</button>
            <br/>
            
            <br/>
            <div className="details">Visualizar el listado de citas</div>
            <br/>
            <Alldates props ={data}/>
          </div>
  
         </HomeStyled>
      )
}
