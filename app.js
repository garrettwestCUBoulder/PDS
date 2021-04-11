const express = require("express");
const app = express();
var mysql = require('mysql');
// var http = require('http');
var path = require('path');

//Including controller/dao for testtable
// var profilePage = require('./routes/profilePage');
var connection  = require('express-myconnection');
// all environments


// app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
app.use(
    connection(mysql,{

			host: 'us-cdbr-east-03.cleardb.com',
			user: 'b85123a121fb78',
			password: '5e13150a',
			database: 'heroku_6b10e0163a2d1a3',
			port: 3306
},'pool')
);

app.get('/', function(req, res){

        res.render('md');

});
app.get('/profile', function(req, res){

  req.getConnection(function(err,connection){
      var query = connection.query("SELECT * FROM users where firstname = 'John Doe';",function(err,rows){
        if(err)
          console.log("Error Selecting : %s ",err );

        res.render('profilePage',{page_title:"Test Table",data:rows});
      });
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Our app is running on " + port);
});

















// connection.getConnection(function(err, connection) {
//   if (err) throw err; // not connected!
//
//   // // Use the connection
//   // connection.query('SELECT * FROM user_table', function (error, results, fields) {
//   //   // When done with the connection, release it.
//   //   connection.release();
//   //
//   //   // Handle error after the release.
//   //   if (error) throw error;
//   //
//   //   // Don't use the connection here, it has been returned to the pool.
//   // });
// });
// user = 'John Doe'
// app.get('/', function(req, res) {
//   var get_user = "SELECT * FROM users WHERE firstname = '" + user + "';";
//   console.log(get_user);
//   connection.query(get_user, (err, result) => {
//     if (err){
//       throw err;
//     }
// 		//redirect to home page on error
// 		res.sendFile(__dirname + '/profilePage.html', function(err) {
//
//       if (err) {
//             throw err;
//         }
//         else{
//           var element = document.getElementById('user');
//           element = results[0].firstname
//         }
//    });
//   });
// });
// var port = process.env.PORT || 8080;
// app.listen(port, function() {
//     console.log('Our app is running on http://localhost:' + port);
// });
//









// var connection = mysql.createPool({
// 	connectionLimit : 10,
// 	host: 'us-cdbr-east-03.cleardb.com',
// 	user: 'b85123a121fb78',
// 	password: '5e13150a',
// 	database: 'heroku_6b10e0163a2d1a3',
// 	multipleStatements: true
// });
