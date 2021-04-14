const express = require("express");
const app = express();
var mysql = require('mysql');
var http = require('http');
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

			host: 'pdsclient.c2bamkbsm98h.us-east-2.rds.amazonaws.com',
			user: 'pdsDB',
			password: 'PDSpassword',
			database: 'pdsclient',
			port: 3306
},'pool')
);

var user_id;

var password_bool = false;

app.get('/', function(req, res){
        var password_bool = true;
        res.render('SignUP_Login',{result_pass: password_bool, result_registered : false});

});


app.get('/dashboard', function(req, res){

  req.getConnection(function(err,connection){
    var querry_get_password = "SELECT first_name, last_name, user_id, `password`,email FROM users WHERE '"+user_id+ "'= user_id;";
    connection.query(querry_get_password, (err, result) => {
      if (err) {
        console.log(err);
        res.render('SignUP_Login')
      }
      else{
          console.log(password_bool)

          res.render('md',{data:result, result_pass: password_bool,result_registered : false});
      }
    });

  });

});



app.post('/log_data', function(req, res) {
	var email = req.body.login_email;
	var password = req.body.login_password;

  req.getConnection(function(err,connection){
  	var querry_get_password = "SELECT first_name, last_name, user_id, `password`,email FROM users WHERE '"+ email+ "'= email;";
    connection.query(querry_get_password, (err, result) => {
  		if (err) {
  			console.log(err);
  			res.render('SignUP_Login')
  		}
  		else {
        console.log('checking password', password, result.length)
        if (result.length != 0){
          if (password == result[0].password) {
            user_id = result[0].user_id
            password_bool = true
            return res.redirect('dashboard')
          }
        }
        else{
          console.log('false')
          res.render('SignUP_Login', {result_pass : false,result_registered : false})
        }

  			}
      });
	});
});


app.post('/res_data', function(req, res) {
  var firstname = req.body.signup_firstname
  var lastname = req.body.signup_lastname
	var email = req.body.signup_email;
	var password = req.body.signup_password;
  var company = req.body.signup_company
  var authorization_code = req.body.signup_auth_code
  var subscription = req.body.subscription
  var register_new_member = "INSERT INTO users (first_name, last_name, `password`, email) VALUES ('"+firstname+"', '"+lastname+"', '"+password+"','"+ email+"'); INSERT INTO companys (company_name, number_of_employees, `authorization_code`) VALUES ('"+company+"', 2000, '"+company+"80PDS'); INSERT INTO memberships (subscription, user_id) VALUES ('"+subscription+"', (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"')); INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companys where company_name = '"+company+"' and `authorization_code` = '"+company+"80PDS'), (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"'), (SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"')));";

  req.getConnection(function(err,connection){

    connection.query(register_new_member, (err, result) => {
  		if (err) {
  			console.log('error',err);
  			res.render('SignUP_Login')
  		}
  		else {
          console.log('Successful')
          res.render('SignUP_Login', {result_pass : false,result_registered : true})
        }
      });
	});
});






app.get('/messages', function(req, res){

        res.render('messagesView');

});

app.get('/profile', function(req, res){


var get_profile_info = "SELECT users.first_name, users.last_name, users.email, user_info.company_id, companys.company_name, memberships.subscription FROM (((users INNER JOIN user_info ON '"+ user_id + "' = user_info.user_id) INNER JOIN companys ON user_info.company_id = companys.company_id) INNER JOIN memberships ON memberships.membership_id = user_info.membership_id) WHERE users.user_id = '"+user_id+"';"



  req.getConnection(function(err,connection){
      var query = connection.query(get_profile_info ,function(err,rows){
        if(err)
          console.log("Error Selecting : %s ",err );
        console.log(user_id,rows[0].first_name)
        res.render('profilePage',{data:rows});
      });
  });
});

const port = process.env.port || 8080;
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
