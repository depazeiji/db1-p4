var express = require('express');
var router = express.Router();

exports.index = function(req, res){
res.render('index', { title: 'ejs' });};

/* GET home page. */
router.get('/', function(req, res, next) {
	//query();
	res.render('index', { title: 'Express' });
});

module.exports = router;

function query(){
	var pg = require('pg');
	var connectionString = process.env.DATABASE_URL || 'postgres://eiji:a789456123@localhost:5432/nueva1';

	var client = new pg.Client({
		host: 'localhost',
		port: '5432',
		user: 'nodetest',
		password: 'a789456123',
		database: 'nueva1'
	});
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function(err, result) {
		if(err) {
			return console.error('error running query', err);
		}
		//console.log(result.rows[0].theTime);
	    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
		client.end();
		});
	});
	//client.connect();
	//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
	//query.on('end', function() { client.end(); });
}