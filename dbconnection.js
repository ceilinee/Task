var mysql=require('mysql');

var connection=mysql.createConnection({
   host:'task.cyyb0zpneg8q.us-east-2.rds.amazonaws.com',
   user:'root',
   password:'roottask',
   database:'task',
   port:'3306',
});
module.exports=connection;
