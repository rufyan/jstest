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

// const getInfo = async (props) => {
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
//     //return requestfn;
//    }
   
   //getInfo();

   async function getInfo(props) {
    let storedata;
    var storeitems = [];
    var requestfn = await https.get(options, (res) =>{
        if(res.statusCode === 200){
                console.log('getinfo called',  res.statusCode);

            res.on('data', data => {
                body += data.toString();
                console.log('on data ');
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    storedata = JSON.parse(body.toString());
                    //console.log(storedata);
                    console.log('from getinfo',storedata.accountId);
                    return storedata;
                }catch(error){
                    handleError(error);
                }
            });
        }else{
            handleError(res.statusCode);
        }
    });
    return requestfn;
   }
   
app.get('/store', (req, res) => {
 console.log('before getinfo call');
 
  let storeapi = getInfo('/v1/store');
    console.log('apidata ', storeapi);

    //console.log('from get store', storeapi); //its async
    //  storedata.forEach(element => {
    //      console.log(element)
    //  });
    res.render('store',  {
        // epicUserHandle: profile.epicUserHandle,
        // accountId : profile.accountId,
        // top25: profile.stats.p2.top25.valueInt
     });
});

app.listen(3000, () => {
    console.log('running')
});

function handleError(error){
    console.log("ERROR: ", error);
}