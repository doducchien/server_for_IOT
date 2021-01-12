const db = require('../connect_db')
const md5 = require('md5');
const { json } = require('express');

const mqtt = require('mqtt');
const client = mqtt.connect("mqtt:192.168.1.239:1883");

client.on('connect', ack => {   

    
    client.subscribe('esp32/authentication', err => {
        // console.log(err)
    })
  
})

module.exports.add_device = (req, res)=>{
    var body = req.body;
    var sql = 'INSERT INTO device SET id_device=?'
    db.query(sql, [body.id_device], (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else res.json(true);
    })
}

module.exports.get_all_device = (req, res)=>{
    var sql = 'SELECT * FROM device'
    db.query(sql, (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else{
            res.json(response);
        }
    })
}
module.exports.add_patient = (req, res)=>{
    var body = req.body;
    var sql = 'UPDATE device SET patient=? WHERE id_device=?'
    db.query(sql, [body.phone_number, body.id_device], (err, response)=>{
        if(err){
            console.log(err);
            res.json(false);
        }
        else res.json(true);
    })
}

module.exports.turn_on_led = (req, res)=>{
    var body = req.body;
    

    var sql =  'SELECT id_device FROM device WHERE patient=?';
    db.query(sql, [body.room], (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else{
            if(response[0]){
                let id_device = response[0].id_device;
                client.publish("esp32/led/" + id_device, "on");
                res.json(true)
            }
            
        }
    })
}

module.exports.turn_off_led = (req, res)=>{
    var body = req.body;

    var sql =  'SELECT id_device FROM device WHERE patient=?';
    db.query(sql, [body.room], (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else{
            if(response[0]){
                let id_device = response[0].id_device;
                client.publish("esp32/led/" + id_device, "off");
                res.json(true)
            }
            
        }
    })
}


