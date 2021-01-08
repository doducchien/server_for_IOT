const { json } = require('express');
const express = require('express')

const device_router = express.Router()
const device_controller = require('../controllers/device.controller')


//middleware
device_router.use((req, res, next)=>{
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


device_router.route('/add')
.post(device_controller.add_device)

device_router.route('/getall')
.post(device_controller.get_all_device)

device_router.route('/add_patient')
.put(device_controller.add_patient)

module.exports = device_router