const https = require('https');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');
app.use(express.static('public'));


const options ={
    
    hostname: 'api.fortnitetracker.com',
    //path : "/v1/store",
//    path : "/v1/profile/ps4/J_J_M_R_D",
    path : "/v1/profile/xbl/zaccaxxxx",
    method: "GET",
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
// var requestfn = https.get(options, (res) =>{
//     if(res.statusCode === 200){
//         res.on('data', data => {
//             body += data.toString();
//         });
//         res.on('end', data => {
//             try{
//                 profile = JSON.parse(body);
//             }catch(error){
//             }
//         });
//     }
// });

app.get('/', (req, res) => {
    res.render('index',  {
        epicUserHandle: profile.epicUserHandle,
        accountId : profile.accountId,
        top25: profile.stats.p2.top25.valueInt
     });
});

function getInfo (props) {
    let storedata;
    let body = '';
    var storeitems = [];
    var requestfn = https.get(options, (res) =>{
        if(res.statusCode === 200){
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    storedata = JSON.parse(body.toString());
                    //console.log(storedata);
                    console.log('from getinfo ',storedata.accountId);
                    return storedata;
                }catch(error){
                    handleError(error);
                }
            });
        }else{
            handleError(res.statusCode);
        }
    });
    return storedata;
   }
   
   //getInfo();

//    async function getInfo(props) {
//     let storedata;
//     var storeitems = [];
//     var requestfn = await https.get(options, (res) =>{
//         if(res.statusCode === 200){
//                 console.log('getinfo called',  res.statusCode);

//             res.on('data', data => {
//                 body += data.toString();
//                 console.log('on data ');
//             });
//             res.on('end', data => {
//                 console.log('on end ');
             
//                 try{
//                     storedata = JSON.parse(body.toString());
//                     //console.log(storedata);
//                     console.log('from getinfo',storedata.accountId);
//                     return storedata;
//                 }catch(error){
//                     handleError(error);
//                 }
//             });
//         }else{
//             handleError(res.statusCode);
//         }
//     });
//     return requestfn;
//    }

app.get('/p/:tagId', function(req, res) {
    res.send("tagId is set to " + req.params.tagId);
  });

app.get('/gamer/:userid', (req, resp) => {
    console.log(req.params.userid)
    let storedata = '';
    var requestfn = https.get(options, (res) =>{
        if(res.statusCode === 200){
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    storedata = JSON.parse(body.toString());
                   // console.log(body.toString());
                    //console.log('from getinfo ',storedata);
                    //return storedata;

                    let top25s = parseInt(storedata.stats.p10.top25.valueInt);
                    
                    if(top25s <= 200 ){
                        top25stext = top25s + " Lol, that trash";
                    }
                    resp.render('gamer',  {
                        epicUserHandle: storedata.epicUserHandle,
                        accountId : storedata.accountId,
                        top25: top25stext,
                        kills: storedata.stats.p10.kills.valueInt,
                        kd: storedata.stats.p10.kd.valueInt
                    });

                }catch(error){
                    handleError(error);
                }
            });
        }else{
            handleError(res.statusCode);
        }
    });
 
  //let storeapi = getInfo('/v1/store');
    //console.log('go ', go());

    //console.log('from get store', storeapi); //its async
    //  storedata.forEach(element => {
    //      console.log(element)
    //  });

});
app.get('/weapons', (req, resp) => {
    const jsonData = require('./weapons.json'); 
    resp.render('weapons',  jsonData);
});


app.get('/history', (req, resp) => {
    //const jsonData = require('./weapons.json'); 
    //resp.render('',  jsonData);
    options.path = "/v1/profile/account/b7b5711b-f6e3-4729-a69e-5fd925656094/matches"
    

    var requestfn = https.get(options, (res) =>{
        if(res.statusCode === 200){
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    storedata = JSON.parse(body.toString());
                   // console.log(body.toString());
                    console.log('from getinfo ',storedata);
                    //return storedata;


                    resp.render('history',  {
                    });

                }catch(error){
                    handleError(error);
                }
            });
        }else{
            handleError(res.statusCode);
        }
    });

});

app.listen(3000, () => {
    console.log('running')
});

function handleError(error){
    console.log("ERROR: ", error);
}