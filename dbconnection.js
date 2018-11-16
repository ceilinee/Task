var mysql=require('mysql');

var connection=mysql.createPool({

   host:'us-cdbr-iron-east-01.cleardb.net',
   user:'b5d52bd6c27bc9',
   password:'70e79d6b',
   database:'heroku_a11898ee5737874',
   port:'3306',

});

module.exports=connection;
