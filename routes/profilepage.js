exports.list = function(req, res){

  req.getConnection(function(err,connection){
      var query = connection.query("SELECT * FROM users where firstname = 'John Doe';",function(err,rows){
        if(err)
          console.log("Error Selecting : %s ",err );

        res.render('profilePage',{page_title:"Test Table",data:rows});
      });
  });
};
