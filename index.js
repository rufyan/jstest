const https = require('https');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');


const options ={
    
    hostname: 'api.fortnitetracker.com',
    //path : "/v1/store",
    path : "/v1/profile/pc/rufyan",
    method: "GET",
    //ciphers: 'DES-CBC3-SHA',
    headers: {
        'TRN-Api-Key': '49245f9b-ddb4-49a9-9d42-716165ef1bae'
    },
    port: '443',
    rejectUnauthorized: false,
      requestCert: true,
      agent: false
};
        let body = "";
	let profile;
var requestfn = https.get(options, (res) =>{
    if(res.statusCode === 200){
        res.on('data', data => {
            body += data.toString();
        });
        res.on('end', data => {
            try{
                profile = JSON.parse(body);
                console.log(profile.accountId);
            }catch(error){
            }
        });
    }
});

app.get('/', (req, res) => {
    res.render('index',  {
        epicUserHandle: profile.epicUserHandle,
        accountId : profile.accountId,
        top25: profile.stats.p2.top25.valueInt
     });
});

app.listen(3000, () => {
    console.log('running')
});