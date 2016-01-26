//var bcrypt = require('bcrypt');
var bcrypt = require('bcrypt-nodejs');
exports.usser = function (req, res, next) {
	req.getConnection(function(error, connection){
		var Administrator = req.session.role === "Admin"
		var user = req.session.role !== "Admin"
  		var input = JSON.parse(JSON.stringify(req.body));
  		
		if(error){
			return next(error);
		}
		connection.query('SELECT * FROM users;', [], function(error, results) {
			if (error) return next(error);
				res.render( 'User', {
					USer: results,
					isAdmin : Administrator,
					action : user
				});
			});
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){

		if (err){ 
			return next(err);
		}
		var input = JSON.parse(JSON.stringify(req.body));
		
		var data = {
			username : input.username,
			role : 'View'

		};

        bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(input.password, salt, function(err, hash) {
		        // Store hash in your password DB. 

		        console.log("hash details...")
		        console.log(hash)
		        console.log(hash.length)

		        data.password = hash;
		        connection.query('insert into users set ?', data, function(err, results) {
		        	if (err)
		        		console.log("Error inserting : %s ", err);

		        	res.redirect('/User');
		        });
		    });
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
			res.render('usersEdit', {page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
	console.log(data)
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
