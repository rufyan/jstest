// console.log('hi');
// console.error("ss");
// console.dir({name: "c", age: 44});
const profile = require('./profile');
const epicNickname = "zacxxx";

const options ={
    
    hostname: 'api.fortnitetracker.com',
    path : "/v1/store",
    method: "GET",
    //ciphers: 'DES-CBC3-SHA',
    headers: {
        'apiKey': '49245f9b-ddb4-49a9-9d42-716165ef1bae'
    },
    port: '443',
    rejectUnauthorized: false,
      requestCert: true,
      agent: false
};

var requestfn = https.get(options, (res) =>{
    console.log(res);
});
//connect to api https://teamtreehouse.com/username.json

const users = ["sds","chalkers", "alenaholligan", "davemcfarland"];
//users.forEach(profile.get);

const usersArr = [
    {"username":"sds", "section":"JavaScript"},
    {"username":"chalkers","section":"JavaScript"},
    {"username": "alenaholligan","section":"JavaScript"},
    {"username": "davemcfarland","section":"JavaScript"}
];


//usersArr.forEach(profile.get);


//getProfile("chalkers");
function printMessage(username, count, points){
   const message = `${username} has ${count} total badges and ${points} in javascript`;
   console.log(message);
}

//console.dir(process.argv);



