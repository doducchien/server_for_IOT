const e = require('express')
const db = require('../connect_db')


module.exports.get_all_patient = (req, res)=>{
    var sql = 'SELECT * FROM patient_acount'
    db.query(sql, (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else{
            res.json(response)
        }
    })
}

module.exports.get_device_id = (req, res)=>{
    var body = req.body;
    var sql =  'SELECT id_device FROM device WHERE patient=?';
    db.query(sql, [body.phone_number], (err, response)=>{
        if(err){
            console.log(err)
            res.json(false)
        }
        else{
            if(response[0]){
                let id_device = response[0].id_device;
                console.log(id_device);
                res.json(id_device)
            }
            
        }
    })
}


