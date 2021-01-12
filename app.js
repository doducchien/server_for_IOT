const express = require('express')
const app = express();
const cors = require('cors')
const db = require('./connect_db')
const http = require('http').Server(app)
var io = require('socket.io')(http)

const port = process.env.PORT || 2206
const port_socket = 2207;


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())



//mqtt
const mqtt = require('mqtt');
const client = mqtt.connect("mqtt:192.168.1.239:1883");

client.on('connect', ack => {   

    
    client.subscribe('esp32/authentication', err => {
        // console.log(err)
    })
  
})



var result_sensor = {}

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})
io.on('connection', (socket)=>{
    console.log('new connection')
    socket.on('join_room', (data)=>{
        var sql = 'SELECT id_device FROM device WHERE patient=?';
        db.query(sql, [data], (err, response)=>{
            if(err){
                console.log(err)
            }
            else{
                if(response[0]){
                    var id_device = response[0].id_device;
                    socket.join('esp32_' + id_device);
                    console.log('join esp32_' + id_device + ' success!');

                    let interval = setInterval(()=>{
                        if(result_sensor[id_device]){
                            let index = result_sensor[id_device].index;
                            io.sockets.to('esp32_' + id_device).emit("bpm_" + data, result_sensor[id_device].bpm[index]);
                        }
                        
                    }, 1000)
                }
                else{
                    console.log('nononononono')
                }
                
            }
        })
    })
    
    // console.log("new connection")
    // let i = 0;  
    // let interval = setInterval(()=>{
    //     let length = result_sensor.length;
    //     if(i >= length) i = length - 1;
    //     else socket.emit('result', String(result_sensor[i]));
    //     i++;
        
    // }, 1000)
    // let interval1 = setInterval(()=>{
    //     result_sensor = [];
        
    // }, 100000)
})

client.on('message', (topic, mess) => {
    if (topic == 'esp32/authentication') {
        var sql = 'SELECT * FROM device WHERE id_device = ?';
        db.query(sql, [mess], (err, response)=>{
            if(err){
                console.log(err)
                client.publish('esp32/authentication/' + mess, "no");

            }
            else{
                if(response.length === 0)
                {   
                    client.publish('esp32/authentication/' + mess, "no");
                    console.log('Authen mqtt fail!')
                } 
                else{
                    client.publish('esp32/authentication/' + mess, "ok");
                    client.subscribe('esp32/pulseSensor/' + mess);
                    id_device = mess;
                    if(!(id_device in result_sensor)){
                        console.log('ok id')
                        result_sensor[id_device] = {
                            index: -1,
                            bpm: []
                        }
                    }
                    else console.log('no id');
                    console.log('Authen mqtt successfully!')
                }
            }
        })
    }
    // if(topic == 'esp32/pulseSensor/' + id_device){
    //     result_sensor[id_divice]
    // }
    if(topic.indexOf('esp32/pulseSensor') > -1){
        var id = topic.split('/')[2];
        console.log(result_sensor)
        result_sensor[id].bpm.push(String(mess));
        result_sensor[id].index++;
    }


})
//


const authen_router = require('./routes/authen.route')
const device_router = require('./routes/device.route')
const patient_router = require('./routes/patient.route');
const { clear } = require('console');
const { join } = require('path');

app.use('/authen', authen_router)
app.use('/device', device_router)
app.use('/patient', patient_router)



app.listen(port, function(){
    console.log("app is running on port " + port)
})

http.listen(port_socket, ()=>{
    console.log('socket is running on port ' + port_socket)
})