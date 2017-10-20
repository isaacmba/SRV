var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , util = require('util')
  , LinkedInStrategy = require('passport-linkedin').Strategy;

var app = express();

// configure express

app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + '/views');
// app.set('view engine','ejs');

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({secret: "grateful ;)"}));

//initialize passport, ,middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+ 'node_modules'));

var LINKEDIN_API_KEY = '77rfytzqxr2hp2';
var	LINKEDIN_SECRET_KEY = 'Q1GtazWCcukzclnY';

// session setup
// in order to support persistent login sessions, 
// Passport needs to be able tot serialize users into and deserialize user out of
// the session. Typically, this will be as simple as storing the user id when serializing 
// and finding the user by id when deserializing. 
passport.serializeUser(function(user, done){
	console.log(user);
	done(null, user);
})
passport.deserializeUser(function(obj, done){
	done(null, obj);
})


// use passport linkedin stategy
passport.use(new LinkedInStrategy(
	{
		consumerKey: LINKEDIN_API_KEY,
		consumerSecret: LINKEDIN_SECRET_KEY,
		callbackURL: "http://localhost:8000/auth/linkedin/callback",
		profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
	},
	function(token,tokenSecret,profile,done) { 
		process.nextTick(function() {
			console.log("token:");
		    console.log(token);

		    console.log("tokenSecret:");
		    console.log(tokenSecret);

		    console.log("profile:");
		    console.log(profile);

			return done(null, profile);
		});
	}
));

// routes
app.get('/', function(req,res){
	res.render(	'index', {user:req.user});
});

app.get()