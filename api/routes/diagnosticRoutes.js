'use strict';
module.exports = function (app) {
    var diagnostics = require('../controllers/diagnosticsController');

    //diagnostics Routes
    app.route('/diagnostics/ping')
        .get(diagnostics.ping);
}