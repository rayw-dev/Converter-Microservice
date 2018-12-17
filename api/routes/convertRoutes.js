'use strict';
module.exports = function (app) {
    var convert = require('../controllers/convertController');

    //diagnostics Routes
    app.route('/convert')
        .post(convert.convert);
}