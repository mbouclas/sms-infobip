var config = {
    notifyUrl : '',
    notifyContentType : '',
    callbackData : ''
};
var InfobipSms = require('../lib/index');
var SMS = new InfobipSms('MyUserName','MyPassword',config);
var msg = 'standard message send €ΑΣΔδσδσσ3εσάέδ';
var longMsg = 'standard message send €ΑΣΔδσδσσ3εσάέδ€standard message send €ΑΣΔδσδσσ3εσάέδ€standard message send €ΑΣΔδσδσσ3εσάέδ€standard message send €ΑΣΔδσδσσ3εσάέδ€';


SMS.send('MeMySelf',['phoneNumber'],msg,function(err,result){
    if (err){
        return console.log(err);
    }

    console.log(result);
});
var messages = [
    {
        "from":"TeachNGo",
        to : ['phoneNumber','phoneNumber','phoneNumber'],
        text : msg
    },
    {
        "from":"MeMySelf",
        to : ['phoneNumber','phoneNumber','phoneNumber'],
        text : 'this is the second message'
    }
];

/*
SMS.sendMultiple('Bulk-1',messages,function(err,result){
    if (err){
        return console.log(err);
    }

    console.log(result);
});*/
