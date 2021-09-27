import React from 'react';
import axios from "axios"
import styled from "styled-components";
const DateStyled=styled.div`
   background-image: url("https://media2.giphy.com/media/3o6ZsUMX8PxMmFpcdy/giphy.gif?cid=ecf05e47s0bm7oqmsbjxstegarzrogkkz1up0nnj02td8smx&rid=giphy.gif&ct=g");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;
    background-position: center;
    align-items: center;
    justify-content: center;
    height: 939px;
    width:100%;
    color: white;
.container{
    display: flex;
    flex-direction: column;
    border: solid 0.5px;
    border-radius: 4px;
    align-items: center;
    box-shadow: 3px 3px white, -0.5em 0 0.4em white;
    width: 50%;
  h4{
    display: flex;
    flex-direction:column;
  }
    
}
.table{
   display: flex;
   flex-direction: column;
     align-items: center;
   border:solid 1px;
    width: 350px;
}
.details{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1vh;
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

      .form-submit{
        color: white;
        background-color: #6f5b80;
        padding: 1rem;
        margin-bottom: 1rem;
        //margin-left: 250px;
        //margin-top: 1rem;
        text-align: center;
        height: 3rem;
        width: 10rem;
        font-weight: bold;
        font-size: 1rem;
        transition: 0.3s linear;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        
        &:hover{
            background-color: #6f5b80;
            color:red;   
        }
    }
    .finish{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: bold;
      height: 500px;
    }
   
`


export function validate(input){
  let errors={};
  if(!input.email){
    errors.email = "*Email is required";
  }else if(!/\S+@\S+\.\S+/.test(input.email)){
    errors.email = "*mail is invalid";
    
  }
  if(input.name.length < 2){
    errors.name = "*Name is required";
  }

  return errors;
}



export default function  Date() {
  const [data , setData] = React.useState([])
  const [hs , setHs] = React.useState([])
  const [dateCreated, setDateCreated] = React.useState("")
  const [day, setDay] = React.useState(false)
  const [errors, setErrors] = React.useState({});
  const [input,setInput] = React.useState({
    email:"",
    day:"",
    hour:"",
    name:""
  })

  const handleInputChange = function(e) {
    e.preventDefault()

    setInput({ ...input, [e.target.name]: e.target.value
    });

  /*   setErrors(validate({...input, [e.target.name]: e.target.value
    })); */
  }


const findDates = (e) =>{
  e.preventDefault()
  const response = axios.post('http://localhost:3001/filteredDates', input);
  response.then(data =>{  
      setHs(data.data)
      setDay(true)
      
     },
     
  ) 
}
const sendDate = (e) =>{
  e.preventDefault()
  const response = axios.post('http://localhost:3001/date', input);
  response.then(data =>{  
    // console.log(data.data)
     if(data.data === "horario ocupado"){
       console.log("horario ocupado")
     }else{
       console.log("cita creada")
       setDateCreated("cita creada")
  }      
     }
  ) 
}

const home = () =>{
  window.location.href="http://localhost:3000/"
}

const filterZ=()=>{ data.sort(function (a, b) {if (a.name > b.name) {return -1;}if (a.name < b.name) {return 1;}return 0; });}
const filterA=()=>{data.sort(function (a, b) {if (a.name > b.name) {return 1;}if (a.name < b.name) {return -1;}return 0;}); }

return (
        <DateStyled>
            <div className="container">
              
                { dateCreated != "cita creada" ? (
                 <> 
                 <h3 className="details">Si todavia no estas seguro puedes volver <button className="but"onClick={home}>regresar</button> </h3>
                <br/>
                <div className="details">
                        <h2> Elige tu dia para morir </h2> 
                  </div>
                    {!day ? (
                      <div className="details">
                        <h3>Day:</h3>
                        <input type="date" 
                            name="day" 
                            value={input.day}
                            onChange={handleInputChange} 
                            className={errors.username && 'danger'}
                            />
                            {errors.username && (
                                <p className="danger">{errors.username}</p>
                    )} <br/>
                        <button className="but" onClick={ findDates }> Fijar dia </button>
                     </div>) : (
                    
                     <div>
                        {<div className="details">
                          <h4>Dia seleccionado {input.day} <br/><button className="but" onClick={() => setDay(false)}> Arrepentido? <br/></button></h4> 
                        </div> }

                        </div>)}
                  <div className="details">
                     
                      {hs.length > 1 ?(
                      <> 
                       <h3>Nombre : </h3>
                       <input type="text" 
                          name="name" 
                          value={input.name}
                          onChange={handleInputChange} 
                          className={errors.name && 'danger'}
                          />
                          {errors.name && (
                              <p className="danger">{errors.name}</p>
                          )} 
                      <br/>
                      <br/>
                     
                      <h3>Email : </h3>
                      <input type="text" 
                          name="email" 
                          value={input.email}
                          onChange={handleInputChange} 
                          className={errors.email && 'danger'}
                          />
                          {errors.email && (
                              <p className="danger">{errors.email}</p>
                  )}
                    <br/>
                      <h3>Dispones de estos turnos en el dia {input.day} : </h3>
                      <select name="hour" 
                              value={input.hour} 
                              onChange={handleInputChange} >
                                          <option defaultValue="selected" ></option>
                                          { hs.length > 1 ? hs.map(h => {
                                              return(
                                                  <option key={h} value={h} >{h} </option>
                                              )
                                          }) : null }
                                          
                      </select>
                      <p className="danger">*Ten en cuenta que la muerte atiende solo de 9 a 18hs y solo te mostrara sus horarios disponibles</p>
                    <br/>
                    {input.name !== "" && input.email !== "" && input.hour !== "" &&
                     <input  
                            type="submit"
                            value ="Crear cita"
                            className="form-submit"  
                            onClick={input.name && input.email && input.hour && sendDate  }
                            disabled={!input.name || !input.email } 
                      />}
                    
                    </>) : null
                    }
                  </div> </>) : <> <div className="finish"> 
                                    <h2 >Cita creada con exito para {input.name}!  </h2><br/>
                                    <h3> La muerte lo visitara el dia {input.day} a las {input.hour}hs </h3>
                                    <button className="but" onClick={home}>Regresar a inicio...</button>
                                    </div></>}
             
             </div>
    </DateStyled>
    )
}