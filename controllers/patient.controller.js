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



