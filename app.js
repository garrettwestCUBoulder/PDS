const express = require("express");
const app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var connection  = require('express-myconnection');

//S3 bucket setup
var multer = require('multer');
var multerS3 = require('multer-s3');
// var bodyParser = require('body-parser');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-2'});
const ID = 'AKIARUD6GFG4GSMWUUSN';
const SECRET = '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';
// app.use(bodyParser.json());
// The name of the bucket that you have created
const BUCKET_NAME = 'elasticbeanstalk-us-east-2-111933794744/databasefiles';
AWS.config.update({
    secretAccessKey: SECRET,
    accessKeyId: ID,
    region: 'us-east-2'
});
// const s3 = new AWS.S3({
//     accessKeyId: ID,
//     secretAccessKey: SECRET
// });
var s3 = new AWS.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
})



// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

// app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));


var conn = mysql.createPool({
	connectionLimit : 10,
  host: 'pdsclient.c2bamkbsm98h.us-east-2.rds.amazonaws.com',
  user: 'pdsDB',
  password: 'PDSpassword',
  database: 'pdsclient',
  port: 3306,
	multipleStatements: true
});

var user_id;

var password_bool = false;

app.get('/', function(req, res){
        var password_bool = true;
        res.render('dashboard',{result_pass: password_bool, result_registered : false});

});
app.post('/upload', upload.array('image', 3), function(req, res, next) {
  console.log('Successfully uploaded ' + req.files + ' files!')
  res.redirect('dashboard')
});

app.get('/dashboard', function(req, res){

  conn.getConnection(function(err,connection){
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

  conn.getConnection(function(err,connection){
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
          else{
            console.log('false')
            res.render('SignUP_Login', {result_pass : false,result_registered : false})
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
  var firstname = req.body.signup_firstname;
  var lastname = req.body.signup_lastname;
	var email = req.body.signup_email;
	var password = req.body.signup_password;
  console.log(email)
  var company = req.body.company;
  var authorization_code = req.body.signup_auth_code;
  var subscription = req.body.subscription;
  var register_new_member = "INSERT INTO users (first_name, last_name, `password`, email) SELECT '"+firstname+"', '"+lastname+"', '"+password+"','"+ email+"' WHERE NOT EXISTS (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"')  LIMIT 1;";
  var register_new_member1 =" INSERT INTO companies (company_name, number_of_employees, `authorization_code`) SELECT '"+company+"',2000, '"+company+"80PDS' WHERE NOT EXISTS (Select company_name From companies WHERE company_name  ='"+company+"') LIMIT 1;";
  var register_new_member2 =" INSERT INTO memberships (subscription, user_id) VALUES ('"+subscription+"', (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"'));";
  var register_new_member3 =" INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companies where company_name = '"+company+"' and " +
  " authorization_code = '"+company+"80PDS'), " +"(SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"'), " +
  "(SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"')));";
  conn.getConnection(function(err,connection){

    connection.query( register_new_member +  register_new_member1 + register_new_member2+register_new_member3 , [1,2,3,4] ,(err, result) => {
      // console.log(register_new_member)
  		if (err) {
        // console.log(register_new_member)
  			console.log(register_new_member +  register_new_member1 + register_new_member2+register_new_member3);
        console.log('error', err);
  			res.render('SignUP_Login',{result_pass : true,result_registered : false})
  		}
  		else {
          console.log('Successful')
          res.render('SignUP_Login', {result_pass : true,result_registered : true})
        }
      });
      });
});






app.get('/messages', function(req, res){

        res.render('messagesView');

});

app.get('/profile', function(req, res){


var get_profile_info = "SELECT users.first_name, users.last_name, users.email, user_info.company_id, companies.company_name, memberships.subscription FROM (((users INNER JOIN user_info ON '"+ user_id + "' = user_info.user_id) INNER JOIN companies ON user_info.company_id = companies.company_id) INNER JOIN memberships ON memberships.membership_id = user_info.membership_id) WHERE users.user_id = '"+user_id+"';"



  conn.getConnection(function(err,connection){
      var query = connection.query(get_profile_info ,function(err,rows){
        if(err){
          console.log("Error Selecting : %s ",err );
        }
        else{
          console.log(user_id,rows[0].first_name)
          res.render('profilePage',{data:rows});
        }

      });
  });
});

const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Our app is running on " + port);
});

app.get('/cases', function(req, res){

        res.render('cases');

});

app.get('/appDB_Senton', function(req, res){

        res.render('appDB_Senton');

});


app.get('/appDB_Robosock', function(req, res){

        res.render('appDB_Robosock');

});

app.get('/appDB_Birthday', function(req, res){

        res.render('appDB_BirthdayPop');

});
app.get('/notifications', function(req, res){

        res.render('notifications');

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


// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
// app.use(
//     connection(mysql,{
//
// 			host: 'pdsclient.c2bamkbsm98h.us-east-2.rds.amazonaws.com',
// 			user: 'pdsDB',
// 			password: 'PDSpassword',
// 			database: 'pdsclient',
// 			port: 3306
// },'pool')
// );









// var connection = mysql.createPool({
// 	connectionLimit : 10,
// 	host: 'us-cdbr-east-03.cleardb.com',
// 	user: 'b85123a121fb78',
// 	password: '5e13150a',
// 	database: 'heroku_6b10e0163a2d1a3',
// 	multipleStatements: true
// });
