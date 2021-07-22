const express = require("express");
const app = express();
var mysql = require('mysql');
var http = require('http');
var path = require('path');
var connection  = require('express-myconnection');





// //S3 bucket setup
// var multer = require('multer');
// var multerS3 = require('multer-s3');
// // var bodyParser = require('body-parser');
// const AWS = require('aws-sdk');
// AWS.config.update({region: 'us-east-2'});
// const ID = 'AKIARUD6GFG4GSMWUUSN';
// const SECRET = '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';
// // app.use(bodyParser.json());
// // The name of the bucket that you have created
// const BUCKET_NAME = 'elasticbeanstalk-us-east-2-111933794744';
// AWS.config.update({
//     secretAccessKey: SECRET,
//     accessKeyId: ID,
//     region: 'us-east-2'
// });
// // const s3 = new AWS.S3({
// //     accessKeyId: ID,
// //     secretAccessKey: SECRET
// // });
// var s3 = new AWS.S3();
// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: BUCKET_NAME,
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, user_id+ '/'+case_id_cur+'/'+file.originalname)
//     }
//   })
// })
//
//
//
//
// var conn = mysql.createPool({
// 	connectionLimit : 10,
//   host: 'pdsclient.c2bamkbsm98h.us-east-2.rds.amazonaws.com',
//   user: 'pdsDB',
//   password: 'PDSpassword',
//   database: 'pdsclient',
//   port: 3306,
// 	multipleStatements: true
// });

var user_id;
var case_id_cur;
var user;

var password_bool = true;
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/public')));



// app.get('/', function(req, res){
//
//   conn.getConnection(function(err,connection){
//     var querry_get_password = "SELECT first_name, last_name, user_id, `password`,email FROM users WHERE '"+user_id+ "'= user_id;";
//     connection.query(querry_get_password, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.render('SignUP_Login')
//       }
//       else{
//           console.log(password_bool)
//
//           res.render('md',{data:result, result_pass: password_bool,result_registered : false});
//       }
//     });
//
//   });
//
// });
app.get('/', function(req, res){
        var password_bool = true;
        // res.render('SignUP_Login')
        res.render('login',{result_pass: password_bool, result_registered : false});

});






app.post('/uploadimage', upload.array('image', 3), function(req, res, next) {
  console.log('Successfully uploaded ' + req.files + ' files!')
  res.redirect('dashboard')
});
app.post('/uploadfileApp', upload.array('upload_file', 3), function(req, res, next) {

  var appName = req.body.appName;
  var appTitle = req.body.appTitle;
	var appDate = req.body.appDate;
	var clientName = req.body.clientName;
  var clientInfo = req.body.clientInfo;
	var description = req.body.description;
  console.log(appDate)
  var add_application = "INSERT INTO applications (user_id, case_id, `application_name`, application_due_date, client_name,client_information, description) VALUES ('"+user_id+"','"+case_id_cur+"', '"+appName+"','"+appDate+"','"+clientName+"','"+clientInfo+"','"+description+"');";


  conn.getConnection(function(err,connection){

  connection.query( add_application ,(err, result) => {
   console.log("creating new member");
   if (err) {
     // console.log(register_new_member
     res.redirect('appDB_Senton');
   }
   else {
     // console.log('Successfully uploaded ' + req.files + ' files!', '  ', req.body.appName)
     res.redirect('appDB_Senton')
     }
   });
   });











});

app.get('/dashboard', function(req, res){

  conn.getConnection(function(err,connection){
    var querry_get_password = "SELECT first_name, last_name, user_id, `password`,email FROM users WHERE '"+user_id+ "'= user_id;";
    var get_reminder = "SELECT reminder_title, remind_on from reminders where user_id = '"+user_id+ "' ORDER BY remind_on;"
    var get_cases_next_5 = "SELECT case_id, `application_name`,  application_due_date from applications where user_id = '"+user_id+ "' ORDER BY application_due_date asc LIMIT 5;";
    var get_top_case = "SELECT case_name from cases where case_id = (SELECT case_id from applications where user_id = '"+user_id+ "' ORDER BY application_due_date asc LIMIT 1);";

    connection.query(querry_get_password+get_reminder +get_cases_next_5 +get_top_case, [1,2,3,4], (err, result) => {
      user = result[0][0].first_name + ' ' +result[0][0].last_name

      if (err) {
        console.log(err);
        res.render('login',{result_pass: password_bool, result_registered : false});
      }


      else if(result[2].length == 0 && result[3].length == 0 && result[1].length == 0){
        console.log('is emoty 231');
        var dict_for_empty_app = {
          application_name: "No cases",
          application_due_date: "N/A 06"
          };
        result[2] =  [dict_for_empty_app];


        var dict_for_empty_reminders = {
            reminder_title: "No Reminders",
            remind_on: "N/A 06"
          };
        result[1] =  [dict_for_empty_reminders];
        var dict_for_empty_applications = {
            application_name: "No cases",
            application_due_date: "N/A 06"
          };
        result[3] =  [dict_for_empty_applications];
        // result[2] =  [dict_for_empty_applications];
        // result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];// result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];
          console.log(result[2][0 ])
        var number_of_reminders1 = 0;
        res.render('md',{ user:user,number_of_cases:0,number_of_applications:0,number_of_reminders:0, data:result, result_pass: password_bool,result_registered : false});

      }





      else if(result[3].length == 0 && result[1].length == 0){
        console.log('is emoty 31');
        var dict_for_empty_reminders = {
            reminder_title: "No Reminders",
            remind_on: "N/A 06"
          };
        result[1] =  [dict_for_empty_reminders];
        var dict_for_empty_applications = {
            application_name: "No cases",
            application_due_date: "N/A 06"
          };
        result[3] =  [dict_for_empty_applications];
        result[2] =  [dict_for_empty_applications];
        // result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];
        var number_of_reminders1 = 0;
        res.render('md',{ user:user,number_of_cases:0,number_of_reminders:number_of_reminders1, data:result, result_pass: password_bool,result_registered : false});

      }
      else if(result[1].length == 0){
        console.log('is emoty 1');
        var dict_for_empty_reminders = {
            reminder_title: "No Reminders",
            remind_on: "N/A 06"
          };
        result[1] =  [dict_for_empty_reminders];

        // result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];
        var number_of_reminders1 = 0;
        res.render('md',{ user:user,number_of_cases:result[3].length, number_of_applications:result[2].length,number_of_cases:result[2].length,number_of_reminders:number_of_reminders1, data:result, result_pass: password_bool,result_registered : false});

      }


      else if(result[2].length == 0){
        console.log('is emoty 2');
        var dict_for_empty_reminders = {
          application_name: "No cases",
          application_due_date: "N/A 06"
          };
        result[2] =  [dict_for_empty_reminders];

        // result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];
        var number_of_reminders1 =  result[1].length;
        res.render('md',{user:user, number_of_applications:0,number_of_cases:result[3].length, number_of_reminders:number_of_reminders1, data:result, result_pass: password_bool,result_registered : false});

      }






      else if(result[3].length == 0){
        console.log('is emoty 3');
        var dict_for_empty_applications = {
            case_name: "No cases"
          };
        result[3] =  [dict_for_empty_applications];
        result[2] =  [dict_for_empty_applications];
        // result[1][0].reminder_title = ['No Reminders'];

          // result[1].Date = ['N/A 06'];
        var number_of_reminders1 = result[1].length;
        res.render('md',{ user:user,number_of_cases:result[3].length, number_of_applications:result[2].length, number_of_reminders:number_of_reminders1, data:result, result_pass: password_bool,result_registered : false});

      }


      else{
          user = result[0][0].first_name + ' ' +result[0][0].last_name
          var number_of_reminders1 = result[1].length;
          console.log(get_cases_next_5,result,result[0][0].first_name)

          res.render('md',{user:user, number_of_cases:result[3].length, number_of_applications:result[2].length, number_of_reminders:number_of_reminders1,data:result, result_pass: password_bool,result_registered : false});
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
  			res.render('login',{result_pass: password_bool, result_registered : false});
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
            res.render('login',{result_pass: false, result_registered : false});
          }
        }
        else{
          console.log('false')
          res.render('login',{result_pass: false, result_registered : false});
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
  // console.log(email)
  var company = req.body.company;
  var authorization_code = req.body.signup_auth_code;
  var subscription = req.body.subscription;
  var register_new_member = "INSERT INTO users (first_name, last_name, `password`, email) SELECT '"+firstname+"', '"+lastname+"', '"+password+"','"+ email+"' WHERE NOT EXISTS (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"')  LIMIT 1;";
  var register_new_member1 =" INSERT INTO companies (company_name, number_of_employees, `authorization_code`) SELECT '"+company+"',2000, '"+company+"80PDS' WHERE NOT EXISTS (Select company_name From companies WHERE company_name  ='"+company+"') LIMIT 1;";
  var register_new_member2 =" INSERT INTO memberships (subscription, user_id) VALUES ('"+subscription+"', (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"'));";
  var register_new_member3 =" INSERT INTO user_info (company_id, user_id, membership_id) VALUES ((SELECT company_id from companies where company_name = '"+company+"' and " +
  " authorization_code = '"+company+"80PDS'), " +"(SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"'), " +
  "(SELECT membership_id from memberships where user_id = (SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"')));";
  var get_user_id = "SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"';";
     conn.getConnection(function(err,connection){

    connection.query( register_new_member +  register_new_member1 + register_new_member2+register_new_member3 +get_user_id, [1,2,3,4,5] ,(err, result) => {
      console.log("creating new member");
  		if (err) {
        // console.log(register_new_member)
  			console.log(register_new_member +  register_new_member1 + register_new_member2+register_new_member3);
        console.log('error', err);
  			res.render('login',{result_pass: true, result_registered : false});
  		}
  		else {
          console.log('Successful',result[4][0].user_id,result[4]);
          res.render('login',{result_pass: true, result_registered : false});
                  user_id = result[4][0].user_id;

                  var bucketParams = {
                    Bucket :BUCKET_NAME,
                    Key:user_id.toString()+'/'
                  };
                  s3.putObject(bucketParams, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else     console.log(data);           // successful response
                  });
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
        // console.log(rows);
        if(err){
          console.log("Error Selecting : %s ",err );
          res.redirect('dashboard');
        }
        else{
          console.log(user_id,rows[0].first_name)
          res.render('profilePage',{user:user,data:rows});
        }

      });
  });
});


app.get('/cases', function(req, res){

  var get_cases = "SELECT case_name,client_name from cases where user_id = '"+user_id+"';";
  conn.getConnection(function(err,connection){
      var query = connection.query( get_cases,function(err,rows){

        if(err){
          console.log("Error Selecting : %s ",err );
          res.redirect('dashboard');
        }

        else{
          console.log(rows.length)
          res.render('cases',{user:user,data:rows});
        }

      });
  });



});

app.get('/applications', function(req, res){
  var get_applications = "SELECT application_id, application_name from applications where user_id = '"+ user_id + "';";
  var get_reminder = "SELECT reminder_title, remind_on from reminders where user_id = '"+user_id+ "' ORDER BY remind_on;"
  var get_timeline = "SELECT `to_do_item`, `complete_by` from timeline where user_id = '"+user_id+ "' ORDER BY `complete_by`;";
  conn.getConnection(function(err,connection){
      var query = connection.query(get_applications + get_reminder + get_timeline, [1,2,3],function(err,rows){
        console.log(rows[1].length)
        if(err){
          console.log("Error Selecting : %s ",err );
          res.redirect('dashboard');
        }
        else if(rows[0].length == 0 && rows[1].length == 0 && rows[2].length == 0){

          res.render('appView', {user:user,number_of_reminders:0, number_of_items:0, number_of_applications:0, data:rows});
          }
        else if(rows[0].length == 0){

          res.render('appView', {user:user,number_of_reminders:rows[1].length, number_of_items:rows[2].length, number_of_applications:0, data:rows});
          }
        else if(rows[1].length == 0){

          res.render('appView', {user:user,number_of_reminders:0, number_of_items:rows[2].length, number_of_applications:rows[0].length, data:rows});
          }
        else if(rows[2].length == 0){

          res.render('appView', {user:user,number_of_reminders:rows[1].length, number_of_items:0 , number_of_applications:rows[0].length, data:rows});
        }
        else{
          console.log(rows)
          res.render('appView', {user:user,number_of_reminders:rows[1].length, number_of_items:rows[2].length ,data:rows});
        }

      });
  });

});



app.post('/addReminder', function(req, res){



    var appName = req.body.appName;
  	// var appDate = new Date(req.body.appDate);
    	var appDate = req.body.appDate;
  	var description = req.body.description;
    var add_reminder = "INSERT INTO reminders (user_id,  `reminder_title`, remind_on,`reminder`) VALUES ('"+user_id+"', '"+appName+"','"+appDate+"','"+description+"');";
    console.log(appDate);

    conn.getConnection(function(err,connection){

    connection.query( add_reminder ,(err, result) => {

     if (err) {
       // console.log(register_new_member
       console.log("Error Selecting : %s ",err );
       res.redirect('applications');
     }
     else {
       // console.log('Successfully uploaded ' + req.files + ' files!', '  ', req.body.appName)
       res.redirect('applications')
       }
     });
     });



});




app.post('/createCase', function(req, res){



    var caseName = req.body.caseName;
  	// var appDate = new Date(req.body.appDate);
    	var clientName = req.body.clientName;
      var clientInfo = req.body.clientInfo
  	var description = req.body.description;
    var add_reminder = "INSERT INTO cases (user_id,  `case_name`, client_name,`client_information`, `description`) VALUES ('"+user_id+"', '"+caseName+"','"+clientName+"','"+clientInfo+"','"+description+"');";


    conn.getConnection(function(err,connection){

    connection.query( add_reminder ,(err, result) => {

     if (err) {
       // console.log(register_new_member
       console.log("Error Selecting : %s ",err );
       res.redirect('cases');
     }
     else {
       // console.log('Successfully uploaded ' + req.files + ' files!', '  ', req.body.appName)
       res.redirect('cases')
       }
     });
     });



});










app.post('/addtimeline', function(req, res){



    var appName = req.body.appName1;
  	// var appDate = new Date(req.body.appDate);
    	var appDate = req.body.appDate1;
  	var description = req.body.description1;
    var add_timeline = "INSERT INTO timeline (user_id,  `to_do_item` , `complete_by`, `description`) VALUES ('"+user_id+"', '"+appName+"','"+appDate+"','"+description+"');";
    console.log(add_timeline)

    conn.getConnection(function(err,connection){

    connection.query(add_timeline ,(err, result) => {

     if (err) {
       // console.log(register_new_member
       console.log("Error Selecting : %s ",err );
       res.redirect('applications');
     }
     else {
       console.log('Successfully uploaded ' + req.files + ' files!', '  ', req.body.appName)
       res.redirect('applications')
       }
     });
     });



});









app.post('/appDB_Senton', function(req, res){
  console.log('testtttttttttt', req.body.case_name)

  var case_name = req.body.case_name;
  var get_top_case = "SELECT @case_id_cur := case_id, `case_name`, `client_name`,`client_information`,`description` from cases where case_id = (SELECT case_id from cases where user_id = '"+user_id+ "' and case_name = '"+case_name+"');";
  var get_applications = "SELECT case_id, application_name, application_due_date from applications WHERE case_id =  @case_id_cur;";


  conn.getConnection(function(err,connection){
      var query = connection.query(get_top_case+get_applications ,[1,2],function(err,rows){
        console.log(get_top_case+get_applications)
        if(err){
          console.log("Error Selecting : %s ",err );
          res.redirect('dashboard');
        }
        else if(rows[0].length == 0){
          res.redirect('dashboard')
        }

        else if(rows[1].length == 0){

          case_id_cur = rows[1][0].case_id;
          var dict_for_empty_reminders = {
              reminder_title: "No Applications",
              remind_on: "N/A 06"
            };
          rows[1] =  [dict_for_empty_reminders];

          // result[1][0].reminder_title = ['No Reminders'];

            // result[1].Date = ['N/A 06'];
          var number_of_reminders1 = 0;
          res.render('appDB_Senton',{user:user,data:rows});
        }
        else{
          // console.log(rows[1][0].application_name);
          case_id_cur = rows[1][0].case_id;
          res.render('appDB_Senton',{user:user,data:rows});
        }

      });
  });

});


app.get('/appDB_Robosock', function(req, res){

        res.render('appDB_Robosock');

});

app.get('/appDB_Birthday', function(req, res){

        res.render('appDB_BirthdayPop');

});
app.get('/notifications', function(req, res){

  var get_reminders = "SELECT reminder_id,`reminder_title`,`reminder`, remind_on from reminders where user_id = '"+ user_id + "' ORDER BY remind_on asc;"
  conn.getConnection(function(err,connection){
      var query = connection.query(get_reminders ,function(err,rows){
        console.log(rows)
        if(err){
          console.log("Error Selecting : %s ",err );
          res.redirect('dashboard');
        }

        else if(rows.length == 0){
          console.log('length=0');
          var dict_for_empty_reminders = {
              reminder_title: "No Reminders",
              reminder: 'None',
              remind_on: "N/A 06"
              };
            rows[0] =  dict_for_empty_reminders;

                  // result[1][0].reminder_title = ['No Reminders'];

                    // result[1].Date = ['N/A 06'];
          var number_of_reminders1 = 1;

          res.render('notifications',{user:user,number_of_reminders:number_of_reminders1,data:rows});
        }
        else{
          console.log(user_id,rows[0].reminder_title)
          res.render('notifications', {user:user,number_of_reminders: 21 ,data:rows});
        }

      });
  });


});


// export const aws_download = (res) => {
//   const ext = '.mp3'
//   const filePath = path.join('temp', 'x' + ext);
//   const params = {
//     Bucket: process.env.AWS_BUCKET,
//     Key: 'folder/1567163054411_s.mp3'
//   };
//   return s3.getObject(params, (err, data) => {
//     if (err) console.error(err);
//     fs.writeFileSync(filePath, data.Body);
//     //download
//     res.download(filePath, function (err) {
//       if (err) {
//         // Handle error, but keep in mind the response may be partially-sent
//         // so check res.headersSent
//         console.log(res.headersSent)
//       } else {
//         // decrement a download credit, etc. // here remove temp file
//         fs.unlink(filePath, function (err) {
//             if (err) {
//                 console.error(err);
//             }
//             console.log('Temp File Delete');
//         });
//       }
//     })
//     console.log(`${filePath} has been created!`);
//   });
// };
//
//
//
//
//
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log("Our app is running on " + port);
});
//
//
//
// /**  S3 download code from example
// 'use strict'
// const AWS = require('aws-sdk')
// const fs = require('fs')
// const ACCESS_KEY_ID = "ENTER ACCESS KEY ID HERE"
// const SECRET_ACCESS_KEY = "ENTER SECRET ACCESS KEY HERE"
// const BUCKET_NAME = "ENTER BUCKET NAME HERE"
// var s3 = new AWS.S3({
//     accessKeyId: ACCESS_KEY_ID,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     endpoint: new AWS.Endpoint("https://s3.pilw.io")
// })
// var params = {
//     Key: 'test.txt',
//     Bucket: BUCKET_NAME
// }
// s3.getObject(params, function(err, data) {
//     if (err) {
//         throw err
//     }
//     fs.writeFileSync('./test.txt', data.Body)
//     console.log('file downloaded successfully')
// })
//  */
//
//

// function create_user_bucket(callback){
// callback();
// console.log("creating new bucket");
// conn.getConnection(function(err,connection){
//   var get_user_id = "SELECT user_id from users WHERE first_name = '"+firstname+"' and last_name = '"+lastname+"' and email = '"+email+"' and password = '"+password+"';"
//   connection.query( get_user_id ,[1],(err, rows) => {
//     // console.log(register_new_member)
// 		if (err) {
//       // console.log(register_new_member)
// 			console.log(register_new_member +  register_new_member1 + register_new_member2+register_new_member3);
//       console.log('error', err);
// 		}
// 		else {
//         console.log(rows[0], get_user_id);
//         user_id = rows[0].user_id;
//         var bucketParams = {
//           Bucket :BUCKET_NAME,
//           key:user_id.toString()
//           };
//           s3.createBucket(bucketParams, function(err, data) {
//               if (err) {
//                 console.log("Error", err);
//               } else {
//                 console.log("Success", data.Location);
//                 }
//               });
// //       }
//     });
//   });
// create_user_bucket(register_new_member_conn());



// s3.createBucket(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     else console.log('Bucket Created Successfully', data.Location);
// });

// app.set('port', process.env.PORT || 4300);


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
