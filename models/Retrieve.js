var db=require('../dbconnection');


var Retrieve={
  getLogin:function(email, password, callback){
    return db.query("SELECT idUsers FROM Users WHERE email=\'"+email+"\' AND password=\'"+password+"\'", callback);
  },
  getProjects: function(id, callback){
    return db.query("SELECT * FROM Project WHERE idUsers = \'"+id+"\'", callback);
  },
};
module.exports = Retrieve;
