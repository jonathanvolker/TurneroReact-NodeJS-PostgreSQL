import React,{useEffect,useState} from 'react'
import axios from "axios"

import styled from "styled-components";
const IntroStyled=styled.div`
    display: flex;
    background-position: center;
    align-items: center;
    justify-content: center;
    border-top: 1vh;
    border: 1px;
    height: 100%;
    width: 100%;
    color: white;
    
.container{
    display: flex;
    flex-direction: column;
    border-top: 1px;
    align-items: center;
    
   
}
.table{
    background: grey ;
   display: flex;
   flex-direction: row;
     align-items: center;
     border:solid 1px;
    max-width: auto ;
    border-radius: 4px;
    box-shadow: 3px 3px white, -0.5em 0 0.4em white;
    

}
.card{
    background: grey ;
    display: flex;
     flex-direction: column;
     align-items: center;
     border:solid 1px;
    max-width: auto ;
    margin-right: 2rem;
    border-radius: 4px;
    box-shadow: 3px 3px white, -0.5em 0 0.4em white;
    padding: 1rem;
}
.details{
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}
.cards{
        display: flex;
        
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

  .paginate{
      display: flex;
      flex-direction: row;
  }
   
`

export default function Alldates(props) {
    const [list,setList] = useState(true)
    const  [data,setData] = useState([])

const changeState = ()=>{
    setData(props.props)
     setList(false)
     console.log(data)
} 
const changeState1 =() =>{
    setData([])
    setList(true)
}


const [currentPage,setCurrentPage]=useState(1);
const [postsPerPage,setPostPerPage]=useState(5);
const pageNumbers=[];
const totalPost= data.length;
const indexOfLastPost= currentPage*postsPerPage;
const indexOfFirstPost= indexOfLastPost - postsPerPage;
const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);
//ciclo para crear los botones de paginado
for(let i=1; i<= Math.ceil(totalPost /postsPerPage);i++){
    pageNumbers.push(i)
}
//fn para cambiar la pagina
const paginate= (pageNumbers) =>{
  setCurrentPage(pageNumbers)
}


    return (
        <IntroStyled>
            { 
            
            <div className="container">
            <br/>
            <div>En esta seccion usted vera informacion sobre las personas que ya dejaron su cita reservada</div>
            <br/>
            <br/>

            { list ? (<><button className="but" onClick={  changeState}>mostrar listado</button> </>) 
             : (<><button className="but" onClick={changeState1}>ocultar listado</button> 
                 <div className="details">
                  <br/>
                  <nav className="paginate">
                        <ul className="paginate">
                        {
                            pageNumbers.map((number)=>{
                                return ( 
                                    <>
                                    <a key={number} className="but"
                                    onClick={()=> paginate(number) } >
                                    {number} 
                                    </a> <br/> </>
                                )
                                })
                            }
                        </ul>
                  </nav>
                  </div>
              </>)  }

            <br/>
            <br/>
            <div className="cards">
            <br/>
            <br/>
            {currentPost.length >= 1 ? (currentPost.map(n => 
           <>
           <div className="card">
            
            <div className="pa"key={n.id} >
            <div className="pa" key={n.name}><p>Nombre de la persona : {n.name}</p></div>
            <div className="pa"key={n.day}><p>Dia elegido para morir : {n.day}</p> </div>
            <div className="pa"key={n.time}>  <p>Hora elegida para morir : {n.time}</p> </div>
            <br/>
            </div>
            <br/>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            </>
                     )) : null}
            </div>
            </div>
               }
         

        </IntroStyled>
    )
}
