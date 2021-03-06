const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const morgan = require('morgan');

const card = require('./card');
const keyword = require('./keyword');

const config = require('./helper/config');

const app = express();

app.use(cors());

if (config.env !== 'test') {
    app.use(morgan(config.logLevel));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Create middleware for checking the JWT
const checkJwt = jwt({
    // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config.auth0.jwksUri
    }),

    // Validate the audience and the issuer.
    audience: config.auth0.audience,
    issuer: config.auth0.issuer,
    algorithms: [config.auth0.algorithm]
});

//Cards
//returns top 20 news in the order of published date
app.get('/news/:pageNum', card.listNews);

//returns top 20 news of a specific user in the order of published date
app.get('/userNews/:pageNum', checkJwt, card.listNewsWithId);

//returns top 20 news in the order of published date
app.get('/keywords', card.listKeywordNews);

//returns top 20 news of a specific user in the order of published date
app.get('/userKeywords', checkJwt, card.listKeywordNewsWithId);

//ManageKeywords
app.route('/keyword')
    .get(checkJwt, keyword.listKeyword) //list keywords according to users
    .put(checkJwt, keyword.addKeyword)  //add keyword to the database with id from req.user.sub
    .delete(checkJwt, keyword.deleteKeyword); //delete client_crawl_ct, crawl_url, news, when keyword is deleted

//Server Start
app.listen(config.server.port, function () {
    if (config.env !== 'test')
        console.log('web server listening on port ' + config.server.port);
});

module.exports = app;