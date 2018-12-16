var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

  var diagnosticRoutes = require('./api/routes/diagnosticRoutes');
  diagnosticRoutes(app);
  
app.listen(port);

console.log('Converter-Microservice RESTful API server started on: ' + port);