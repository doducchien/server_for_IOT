const express = require('express')

const patient_router = express.Router()
const patient_controller = require('../controllers/patient.controller')

patient_router.use((req, res, next)=>{
    var body = req.body;
    console.log(body)
    if(body){
        if(body.role === 'doctor'){
            next();
        }
        else{
            console.log('dont authen because of patient')
            res.json(false)
        }
    }
    else{
        console.log('dont authen')
        res.json(false);
    }
})


patient_router.route('/getall')
.post(patient_controller.get_all_patient)


module.exports = patient_router;