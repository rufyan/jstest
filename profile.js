const https = require('https');
const http = require('http');

function get(person){
    //options.agent = new https.Agent(options);
    //console.log('u: ', person.username, 's: ', person.section);
    //https.get('https://api.fortnitetracker.com/v1/profile/xbl/${epicNickname}', (res) =>{
        //https.get('https://api.fortnitetracker.com/v1/store', (res) =>{    
    //         process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    //         var req =  https.request(options, (res) => {
    //     //console.dir(res);
    //         let body = "";
    //         res.on('data', data => {
    //         body += data.toString();
    //             //console.log(data);
    //         //process.stdout.write(data);
    //     });
    //     res.on('end', () =>{
    //       //  console.log(body);
    //     })
    //     //console.log(req.headers);
    // //read data
    // //parse data
    // //print data
    
    // //console.log(res.statusCode);
    
    //  //   console.log(res.headers);
    // });
    //     req.end();
    try
    {
        var request = https.get(`https://teamtreehouse.com/${person.username}.json`, (res) =>{
        if(res.statusCode === 200){
            let body = "";
            res.on('data', data => {
                body += data.toString();
            });
            res.on('end', data => {
                try{
                const profile = JSON.parse(body);
                console.log(person.username, profile.badges.length, `section points: ${person.section} -`, profile.points[person.section]);
                }catch(error){
                    showError(error);
                }
            });
        }else{
            const message = `error for ${person.username} (${http.STATUS_CODES[res.statusCode]})` ;
            const statusCodeError = new Error(message);
            showError(statusCodeError);
        }
    }); 
      
    request.on('error', error => console.error(`problem with req ${error.message}`));

    }catch (error){
        showError(error);
    }
    
}


function showError(error){
    console.error(error.message);
}

module.exports.get = get;