"use strict"
var bcrypt = require('bcrypt');
//var bcrypt = require('bcrypt-nodejs');
exports.usser = function (req, res, next) {
	req.getConnection(function(error, connection){
		var Administrator = req.session.role === "Admin";
		var user = req.session.role !== "Admin";

		console.log(req.session.role);
		console.log("user" + user);
		
  		//var input = JSON.parse(JSON.stringify(req.body));
  		
		if(error){
			return next(error);
		}
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
exports.add = function (req, res, next) {

	req.getConnection(function(err, connection){

		if (err){ 
			return next(err);
		}
		var input = JSON.parse(JSON.stringify(req.body));
		
		var data = {
			username : input.username,
			password : input.password,
			//password_confirm: input.password_confirm,
            role : 'View'

		};
		    //password_confirm :input.password_confirm

        bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(input.password, salt, function(err, hash) {
		        // Store hash in your password DB. 

		        console.log("hash details...")
		        console.log(hash)
		        console.log(hash.length)

		        data.password = hash;
		        
		        connection.query('insert into users set ?', [data], function(err, users) {
	               // user = users[0]; 
	               //  console.log(user);
	                if (err)
                            console.log("Error inserting : %s ", err);
                    
                    // if (input.username === user.username){
                  
                    //   res.redirect('/signup');
                 //}
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
                //role : input.key    
                role:  "Admin" //input.key
                
            };

            //Admin = 'Admin';

            //bcrypt the password ===
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(input.password, salt, function(err, hash) {
                    // Store hashed password in my Database. 
                    data.password = hash;

                    connection.query('insert into users set ?', data, function(err, users) {
                        if (err)
                            console.log("Error inserting : %s ", err);
                       // if(input.username === users.username){ //if(role == Admin){                     
                       //alert('user_created');
                           res.redirect('/?status=user_created');

                       // }
                       //  else{
                       //     res.redirect('/admin_signup');

                       //    }
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


exports.get = function(req, res, next){
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM users WHERE Id = ?', [Id], function(err,rows){
			if(err){
				console.log("Error Selecting : %s ",err );
			}
			res.render('usersEdit', {
			page_title:"Edit User - Node.js", 
			user:req.session.user,
		    role:req.session.role,
		    //Id :req.session.Id,
			data : rows[0]
		   });      
		}); 
	});
};
// here I want to update my users

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	console.log(data)
	var Id = req.params.Id;
	req.getConnection(function(err, connection){
		connection.query('UPDATE users SET ? WHERE Id = ?', [data, Id], function(err, rows){
			if (err){
				console.log("Error Updating : %s ",err );
			}
			res.redirect('/home');
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
