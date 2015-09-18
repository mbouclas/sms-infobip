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

SMS.prototype.send = function(from,to,message,callback){
    var url = this.Config.apiUrl + this.Config.apiEndPoints.advanced;


    var requestData = {
        messages : [
            {
                from :from,
                text : message.toString('utf8'),
                destinations : []
            }
        ]
    };

    lo.forEach(to,function(recipient){
        requestData.messages[0].destinations.push({to : recipient});
    });

    if (this.Config.notifyUrl){
        requestData.messages[0].notifyUrl = this.Config.notifyUrl;
    }

    if (this.Config.notifyContentType){
        requestData.messages[0].notifyContentType = this.Config.notifyContentType;
    }

    if (this.Config.callbackData){
        requestData.messages[0].callbackData = this.Config.callbackData;
    }

    var sendOptions = {
        url : url,
        method : 'POST',
        headers : this.headers.post,
        body : JSON.stringify(requestData)
    };

    if (this.Config.debug){
        console.log(requestData);
    }

    Post(sendOptions,callback);
};

SMS.prototype.sendMultiple = function(bulkId,messages,callback){
    var _this = this;
    var url = this.Config.apiUrl + this.Config.apiEndPoints.advanced;
    var requestData = {
        bulkId : bulkId,
        messages : []
    };

    lo.forEach(messages,function(message){
        message.text = message.text.toString('utf8');

        if (_this.Config.notifyUrl){
            message.notifyUrl = _this.Config.notifyUrl;
        }

        if (_this.Config.notifyContentType){
            message.notifyContentType = _this.Config.notifyContentType;
        }

        if (_this.Config.callbackData){
            message.callbackData = _this.Config.callbackData;
        }

        lo.forEach(message.to,function(recipient){
            message.destinations.push({to : recipient});
        });

    });

    requestData.messages = messages;

    var sendOptions = {
        url : url,
        method : 'POST',
        headers : this.headers.post,
        body : JSON.stringify(requestData)
    };
    if (this.Config.debug){
        console.log(JSON.stringify(requestData));
    }
    Post(sendOptions,callback);
};

SMS.prototype.getReports = function(){

};

SMS.prototype.getLogs = function(){

};

SMS.prototype.setOption = function(option,value){
    this.Config.option = value;
    return this;};

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