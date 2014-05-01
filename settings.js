var express = require('express');

var app = express.createServer();
exports.app = app;

exports.appPort = process.env.IG_APP_PORT || 3000;
exports.CLIENT_ID = process.env.IG_CLIENT_ID || '2b67522669c44c7bb7c40bcbd78880ca';
exports.CLIENT_SECRET = process.env.IG_CLIENT_SECRET || '8d1f55df2ae044c4a08aed44af894dc7';
exports.httpClient = (process.env.IG_USE_INSECURE ? require('http') : require('https'));
exports.apiHost = process.env.IG_API_HOST || 'api.instagram.com';
exports.apiPort = process.env.IG_API_PORT || null;
exports.basePath = process.env.IG_BASE_PATH || '';
exports.REDIS_PORT = 6379;
exports.REDIS_HOST = 'redis-feed.cloudapp.net';

app.set('view engine', 'jade');

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public/'));
});
app.configure('development', function(){
    app.use(express.logger());
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
    app.use(express.errorHandler());
});