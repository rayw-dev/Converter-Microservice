var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
  extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

var diagnosticRoutes = require('./api/routes/diagnosticRoutes');
diagnosticRoutes(app);

var convertRoutes = require('./api/routes/convertRoutes');
convertRoutes(app);

app.listen(port);

console.log('Converter-Microservice RESTful API server started on: ' + port);