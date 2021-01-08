const express = require('express')
const app = express();
const cors = require('cors')

const port = process.env.PORT || 2206
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

//mqtt
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt:192.168.1.239:1883");

client.on('connect', ack => {   
    console.log(ack);
    client.subscribe('esp32/pulseSensor', err => {
        console.log(err);
    })
    client.subscribe('esp32/authentication', err => {
        console.log(err)
    })
  
})


client.on('message', (topic, mess) => {
    console.log(topic + ": " + mess);
    if (topic == 'esp32/authentication' && mess == '123456') {
        client.publish('esp32/authentication/123456', "ok");
    }


})
//


const authen_router = require('./routes/authen.route')
const device_router = require('./routes/device.route')
const patient_router = require('./routes/patient.route')

app.use('/authen', authen_router)
app.use('/device', device_router)
app.use('/patient', patient_router)









app.listen(port, function(){
    console.log("app is running on port 2206")
})