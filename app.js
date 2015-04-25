//comentario nuevo
//comentario version 4
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jquery = require('jquery');     

var routes = require('./routes/index');
var users = require('./routes/users');
var cliente = require('./routes/cliente');
var admin = require('./routes/admin');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(3002);

  

io.sockets.on('connection', function(socket){
  socket.on('login', function(nombre, password){   
      var pg = require('pg');
     var client = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'a789456123',
        database: '[BD1]Practica4'
      });

      client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        
      client.query('SELECT * FROM CLIENTE', function(err, result) {
        if(err) {
          return console.error('error running query', err);
        } 
         for (var i=0; i<result.rows.length; i++){
            //console.log(nombre);
            //console.log(password);
            //console.log(result.rows[i].name)
            if(nombre == result.rows[i].nombre && password == result.rows[i].password){
              if(nombre == 'admin'){
                console.log('mandar a administracion');
                io.sockets.emit('confirmacion', 2);
              }
              else{
                console.log(nombre);
                io.sockets.emit('confirmacion', 1);
              }
            }
            else{
              console.log('Usuario o contrasena incorrecta');
              io.sockets.emit('confirmacion', 0);
            }
          }
        client.end(); 
      });
    
    });
  });

  socket.on('agregarBus', function(numero, tipo){
      var pg = require('pg');
    var client = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'a789456123',
        database: '[BD1]Practica4'
      });
    client.connect(function(err) {
        if(err) {
          io.sockets.emit('busAgregado', 0, err);
          return console.error('could not connect to postgres', err);  
        }
        
      client.query('INSERT INTO BUS VALUES(' + numero + ',' + tipo + ')', function(err, result) {
        if(err) {
          io.sockets.emit('busAgregado', 0, "No se pudo agregar el bus. " + err);
          return console.error('error running query', err);
        } 
         io.sockets.emit('busAgregado', 1, err);
          
        client.end(); 
      });
    
     });
  }); 

   socket.on('modificarBus', function(numero, tipo){
      var pg = require('pg');
    var client = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'a789456123',
        database: '[BD1]Practica4'
      });
    client.connect(function(err) {
        if(err) {
          io.sockets.emit('busModificado', 0, err);
          return console.error('could not connect to postgres', err);  
        }
        
      client.query('UPDATE BUS SET tipo_bus = ' + tipo + ' WHERE bus = ' + numero, function(err, result) {
        if(err) {
          io.sockets.emit('busModificado', 0, "No se pudo modificar el bus. " + err);
          return console.error('error running query', err);
        } 
         io.sockets.emit('busModificado', 1, err);
          
        client.end(); 
      });
     });
  }); 

   socket.on('eliminarBus', function(numero){
      var pg = require('pg');
    var client = new pg.Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'a789456123',
        database: '[BD1]Practica4'
      });
    client.connect(function(err) {
        if(err) {
          io.sockets.emit('busEliminado', 0, err);
          return console.error('could not connect to postgres', err);  
        }
        
      client.query('DELETE FROM BUS WHERE bus = ' + numero, function(err, result) {
        if(err) {
          io.sockets.emit('busEliminado', 0, "No se pudo eliminar el bus. " + err);
          return console.error('error running query', err);
        } 
         io.sockets.emit('busEliminado', 1, err);
          
        client.end(); 
      });
     });
  }); 

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/cliente', cliente);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
