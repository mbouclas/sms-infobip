var request = require('request');
var lo = require('lodash');

function SMS(username,password,config){
    if (!username || !password){
        throw 'username & password are required';
    }
    var Config = require('./config.json');

    if (config){
        Config = lo.merge(Config,config);
    }

    this.Config = Config;
    this.username = username;
    this.password = password;
    var encodedPass = new Buffer(username + ':' + password).toString('base64');
    this.headers = {
        post : {
            "Content-Type": "application/json",
            "Authorization" : "Basic " + encodedPass,
            "Accept" : "application/json"
        },
        get : {
            "Authorization" : "Basic " + encodedPass,
            "Accept" : "application/json"
        }
    };


    return this;
}

SMS.prototype.send = function(from,to,text,callback){
    var url = this.Config.apiUrl + this.Config.apiEndPoints.single;

    var requestData = {
        from : from,
        to : to,
        text : text.toString('utf8')
    };

    if (this.Config.notifyUrl){
        requestData.notifyUrl = this.Config.notifyUrl;
    }

    if (this.Config.notifyContentType){
        requestData.notifyContentType = this.Config.notifyContentType;
    }

    if (this.Config.callbackData){
        requestData.callbackData = this.Config.callbackData;
    }

    var sendOptions = {
        url : url,
        method : 'POST',
        headers : this.headers.post,
        body : JSON.stringify(requestData)
    };

    Post(sendOptions,callback);
};

SMS.prototype.sendMultiple = function(message){

};

SMS.prototype.getReports = function(){

};

SMS.prototype.getLogs = function(){

};

function Post(sendOptions,callback){
    request.post(sendOptions, function(err, res, body){
        if (err) {
            return callback(err);
        }

        return callback(null, body);
    });
}

function Get(sendOptions,callback){
    request.get(sendOptions, function(err, res, body){
        if (err) {
            return callback(err);
        }

        return callback(null, body);
    });
}

module.exports = SMS;