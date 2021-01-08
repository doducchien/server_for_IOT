const db = require('../connect_db')
const md5 = require('md5')


module.exports.signup_doctor = (req, res)=>{
    var body = req.body;
    body.password = md5(body.password + body.phone_number)
    var sql = 'INSERT INTO doctor_acount SET ?';
    db.query(sql, [body], (err, response)=>{
        if(err) res.json(false)
        else res.json(true)
    })
}

module.exports.signup_patient = (req, res)=>{
    var body = req.body;
    var sql = 'INSERT INTO patient_acount SET ?';
    db.query(sql, [body], (err, response)=>{
        if(err) res.json(false)
        else res.json(true)
    })
}

module.exports.login_doctor = (req, res)=>{
    var body = req.body;
    var phone_number =body.phone_number;
    var password = md5(body.password + body.phone_number);
    var sql = 'SELECT * FROM doctor_acount WHERE phone_number=? AND password=?';
    db.query(sql, [phone_number, password], (err, response)=>{
        if(err) res.json(false);
        else{
            if(response[0]){
                let user = {
                    ...response[0],
                    role: 'doctor'
                }
                res.json(user);
            }
            else res.json(false)
            
        }
    })
}
module.exports.login_patient = (req, res)=>{
    var body = req.body;
    var sql = 'SELECT * FROM patient_acount WHERE phone_number=? AND cmnd_number=?'
    db.query(sql, [body.phone_number, body.cmnd_number], (err, response)=>{
        if(err) res.json(false);
        else{
            if(response[0]){
                let user = {
                    ...response[0],
                    role: 'patient'
                }
                res.json(user)
            }
            else res.json(false);
        }
    })
}