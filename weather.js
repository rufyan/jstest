const https = require('https');
const http = require('http');
const api = require('./api.json');

function printWeather(q, weather) {
    const message = `Current weather in ${weather.name} is ${weather.weather[0].main}. The temparature is ${Math.round((weather.main.temp - 273.15))}`;
    console.log(message);
}

function printError(error){
    console.error(error);
}

function get(query){
    const readablequery = query.replace('_',' ');
    try {
        const request = 
            https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}`, (response) => {
            //console.log('d ', `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}`);
            if(response.statusCode === 200){
                let body = '';
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try{
                        const weather = JSON.parse(body);
                        if(weather.weather){
                            printWeather(readablequery, weather);
                        }else { //location error
                            const queryError = new Error(`THe locaiton ${readablequery} was not found`);
                            printError(queryError);
                        }
                    }catch (error){ //parse error
                        printError(error);
                    }
                });
            }else{ //status code error
                const statuscodeerror = new Error(`There was an error on ${readablequery} ${response.statusCode} -  (${http.STATUS_CODES[response.statusCode]})`);
                printError(statuscodeerror);
            }
        });
    } catch (error) {//url error
        printError(error);
    }
}

module.exports.get = get;