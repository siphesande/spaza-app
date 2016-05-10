var bcrypt = require('bcryptjs');

exports.login = function(req, res, next){
    req.getConnection(function(error, connection){
        var input = JSON.parse(JSON.stringify(req.body));
			  var username = input.username;
			  var password = input.password;
			  if(error){
  				    return next(error);
  			    }

        connection.query('SELECT  * FROM users WHERE username = ?', username, function(error, users) {
            
			      var user = users[0];
			      console.log("also user" + user);
			      if(user === undefined){
			     	req.flash("info", 'invalid username!');
			     	return res.redirect('/');
			     };

			     bcrypt.compare(input.password, users[0].password, function(err, pass){
                   if (err) {
			    		console.log(err);
			    	}

			    	console.log(pass);
                   //the user is recognised it will redirect us to the home page.
			    	if (pass) {
			    		req.session.user = username;
			    		req.session.role =  user.role;
			    		console.log(req.session.role);
			    		req.flash('info', 'Welcome!');
			    		return res.redirect('/home');
			    		console.log(pass);
			    	}
			    	else if(password === undefined || user === undefined){
			    		 res.redirect('/');

			    	}else{
			    		 req.flash('info', 'Incorrect username or Password!');
			    		 res.redirect('/');
                    };

			  	});
			});
	});  
};
