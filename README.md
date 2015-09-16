#sms-infobip


Send SMS text messages using the Infobip API

## What does it do
This package allows you to add localization files to your Node project. You can store the localization files in
different directories and add them asynchronously as needed. You can use it as a standalone library or in conjunction
with a framework like Express.

## Why another localization library
Simply because i couldn't find one that fits my workflow. Most libraries have a lot of features but are highly opinionated
on how you need to work. Currently my need is for a localization library that can add translations incrementally in different
parts of my project. Also, i like to break my localization variables into multiple files for better organization, something
that most other libraries don't support.

## Install
npm install mcms-node-localization

## Folder structure
The library expects a structure like so :
```
/lang
        /en
            messages.json
        /es
            messages.json
```

Every file in those folders will be parsed and assigned to an object like so : messages.myTranslationVariable
The first part is always the filename and the second your variable.

## Usage
check [the examples folder](https://github.com/mbouclas/mcms-node-localization/tree/master/examples) for usage scenarios
Initialize like so :
```
var Lang = require('mcms-node-localization');
var locales = ['en','de']; //assuming you have 2 languages
var t = new Lang({
    directory : __dirname + '/locales',
    locales : locales
});
```
then add the translations

```
t.add();
```

### Translate using named parameters
```
console.log(t.get('messages.weekend',{name : 'Michael',surname : 'Bobos'}));
```

### Translate using arguments
```
console.log(t.get('messages.tree','bob','john'));
```

### Pluralize
```
console.log(t.choice('messages.cat',2,{name : 'Michael',surname : 'bobos'}));//using named parameters
console.log(t.choice('messages.cat',1,'is enough'));//using arguments
```

### Add new translations at a later stage from a different location
```
t.add({
    directory : __dirname + '/additionalLocales',
    locales : locales
},function(err,translations){
    console.log(t.get('msg.Hello',{name : 'Michael',surname : 'bobos'}));
});
```


## API

### add(options,callback)
where options :
```
{
    directory : __dirname + '/additionalLocales',
    locales : locales
}
```

### get(translationVariable,optionalArguments)
Where optionalArgument could be an object with named parameters or actual parameters. We are making use of sprintf so
if you go for the parameters option make sure they are of the right type.

### choice(translationVariable,count,optionalArguments)
Count is a number that will output the singular or plural option of the translation variable.
Where optionalArgument could be an object with named parameters or actual parameters. We are making use of sprintf so
if you go for the parameters option make sure they are of the right type.

### inject(translationVariable,value)
Inject an object to an existing translation. You can either inject the full blown object like so :
```
var newTranslation = {
    en : {
        focus : 'Daniel san EN'
    },
    de : {
        focus : 'Daniel san DE'
    }
};
t.inject('tester',newTranslation);
```

or just a single variable like so :
```
var newTranslation2 = {
    en : 'bob EN',
    de : 'bob DE'
};

t.inject('tester.name',newTranslation2);
```

This method is especially useful if you want to load translations from a DB instead from the disk
