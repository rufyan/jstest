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

app.get('/', (req, res) => {
        res.render('index',  {
    });
});

app.get('/store', (req, res) => {
    var requestfn = https.get(options, (res) =>{
        //let storedata;
        if(res.statusCode === 200){
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    const storedata =  JSON.parse(body.toString());
                    //console.log(storedata);
                    usedata(storedata);
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

    function usedata(data){
        console.log('from usedata ',data);

    }

//     async function go() {
//         let response = await getInfo('/v1/store');
//         console.log('from go ',response);
//         return response;
//     }
//     go().then(x=> console.log('x ', x));
//  console.log('before getinfo call ', go());

    //console.log('from get store', storeapi); //its async
    //  storedata.forEach(element => {
    //      console.log(element)
    //  });
    res.render('store',  {

     });
});

async function getInfo (props) {
    let body = '';
    var storeitems = [];
    var requestfn = await https.get(options, (res) =>{
        //let storedata;
        if(res.statusCode === 200){
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                console.log('on end ');
             
                try{
                    const storedata = async () => { await JSON.parse(body.toString())};
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
    //return storedata;
   }
   
   


app.listen(3000, () => {
    console.log('running')
});

function handleError(error){
    console.log("ERROR: ", error);
}