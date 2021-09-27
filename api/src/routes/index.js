const { Router } = require('express');
const { Dates } = require('../db');
const fetch = require('node-fetch');
const cors = require('cors');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
router.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
// Configurar los routers

const findDates = ()=>{
    const findAllDates = Dates.findAll().then(data => data.map(d => [(d.time),(d.day),(d.email)]))
    return findAllDates
}

router.get('/alldates', async(req, res)=> {
    const findAllDates = await Dates.findAll().then(data => data.map(d => [(d.time),(d.day),(d.name)])).then(data =>res.json(data))

    
})


router.post('/date', async (req, res) => {
    
    const {name, email, hour, day} = req.body;
    try {
        if(name && email && hour && day){
            const cita= Dates.findOrCreate({
                    where: {
                        name:name,
                        day: day,
                        time:hour,
                        email:email
            
                    },
                }).
                then(data => data[1] ? res.json({"message":"cita creada","data":data[0]}) : res.json("horario ocupado") )
        }      
    }catch (error) {
        console.log(error)
    }}
)

let results = []

router.post('/filteredDates',  (req, res) => {
    const {day} = req.body
   results = [];

    try {
        const hours= ["9","10","11","12","13","14","15","16","17","18"]
        const reduceHours = (d)=>{
            const h = hours.forEach(hour => {
               // console.log(hour)
                if(d.indexOf(hour) === -1){
                results.push(hour)
               // console.log(hour)
             }
            })
                
                return results
            }
        const findAllDatesByDay = Dates.findAll({where:{day}}).
        then(data => {
            const r = data.map(d => d.time)
            const h = reduceHours(r)
           res.json(h)
        }
            )
    } catch (error) {
    res.send(error)        
    }
})
  
router.get("/dates", (req, res) =>{
 
    try {
        const findAllDate = Dates.findAll().then(data => res.json(data))
    } catch (error) {
        res.send(error)
    }
})
  






module.exports = router;