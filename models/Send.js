var db=require('../dbconnection');


var Send={
  addName:function(body, callback){
    return db.query("INSERT INTO Users (email, password) VALUES (\'" + body.email + "\', \'" + body.password + "\')", callback);
  },
  addProject:function(body, callback){
    return db.query("INSERT INTO Project (name, dateDue, dateMade, idUsers, school, extra, work) VALUES (\'" + body.name + "\', \'" + body.date + "\', \'" + body.dateMade + "\', \'" + body.idUsers + "\', \'" + body.school + "\', \'" + body.extra + "\', \'" + body.work + "\')", callback);
  },
  changeCheck: function (body, callback) {
    return db.query(`UPDATE Project SET checked = (CASE WHEN checked = '1' THEN 0 ELSE 1 END) WHERE Name = "${body.name}" AND idUsers = "${body.idUsers}"`, callback);
  },
};
module.exports = Send;
