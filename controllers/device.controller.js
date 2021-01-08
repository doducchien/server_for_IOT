const db = require('../connect_db')
const md5 = require('md5');
const { json } = require('express');

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



