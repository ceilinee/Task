var mysql=require('mysql');

var connection=mysql.createConnection({
   host:'task.cyyb0zpneg8q.us-east-2.rds.amazonaws.com',
   user:'root',
   password:'roottask',
   database:'task',
   port:'3306',
});
connection.connect(function(err) {
  if(err){
  console.error('error connecting: ' + err.stack);
  return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports=connection;
