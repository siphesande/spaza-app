
var bcrypt = require('bcryptjs');
exports.usser = function (req, res, next) {
    req.getConnection(function(error, connection){
		    var Administrator = req.session.role === "Admin";
		    var user = req.session.role !== "Admin";

        connection.query('SELECT * FROM users', [], function(error, results) {
			      if (error) return next(error);
				    res.render( 'User', {
					  user: req.session.user,
					  role: req.session.role,
					  Id: req.session.Id,
					  USer: results,
					  Admin : Administrator,
					  action : user
				   });
		    });
	   });
};

// add the user(VIEW) to database
exports.add = function(req, res, next) {
    req.getConnection(function(err, connection){
    if (err){
			return next(err);
		}
		var input = JSON.parse(JSON.stringify(req.body));

		var data = {
			username : input.username,
			password : input.password,
			role : 'View'
    };

    bcrypt.genSalt(10, function(err, salt) {
			  bcrypt.hash(input.password, salt, function(err, hash) {
		        // Store hash in your password DB.
           data.password = hash;
           connection.query('insert into users set ?', [data], function(err, users) {
               if (err)
                  console.log("Error inserting : %s ", err);
                  else{
                     res.redirect('/?status=user_created');
                    }
		           });
		      });
		});
	});
};

 exports.adminSignup = function(req, res, next) {
     req.getConnection(function(err, connection) {
            if (err) {
                return next(err);
            }
            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                username: input.username,
                password: input.password,
                role:  "Admin" //input.key
            };

             //bcrypt the password ===
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(input.password, salt, function(err, hash) {
                    // Store hashed password in my Database.
                    data.password = hash;
                    connection.query('insert into users set ?', data, function(err, users) {
                        if (err)
                            console.log("Error inserting : %s ", err);
                         //alert('user_created');
                           res.redirect('/?status=user_created');
                     });
                  });
              });
          });

};
//updating a user
 exports.admin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE users SET role = "Admin" WHERE Id = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                   res.redirect('/User');
               });

        });
 };
exports.notAdmin = function(req, res, next) {
    var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE users SET role = "View" WHERE Id = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                res.redirect('/User');
            });

        });
    };

exports.update = function(req, res, next){
    var data = JSON.parse(JSON.stringify(req.body));
	  var Id = req.params.Id;
	  req.getConnection(function(err, connection){
		     connection.query('UPDATE users SET ? WHERE Id = ?', [data, Id], function(err, rows){
			  if (err){
				   console.log("Error Updating : %s ",err );
			  }
			     res.redirect('/User');
		     });
     });
};
//delete the user
exports.delete = function(req, res, next){
	  var Id = req.params.Id;
	  req.getConnection(function(err, connection){
		    connection.query('DELETE FROM users WHERE Id = ?', [Id], function(err,rows){
			      if(err){
		         //alert("Are You sure You Want To delete This Product?");
		           console.log("Error Selecting : %s ",err );
		        }
		           res.redirect('/User');
		       });

	  });
};
