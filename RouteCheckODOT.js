let googleKey = 'AIzaSyBdh-SfHucloBHQTnyLdwbJfmScUk0yFXI';
var googleMapsClient = require('@google/maps').createClient({key:googleKey});
var asPromise = require('asPromise');

var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let originPt = '14964 SE Glenbrook Road, Clackamas, OR 97015'; 
let destPt = '79 SE Taylor St, Portland, OR 97214';
googleMapsClient.directions({
    origin: originPt,
    destination: destPt,
    mode: 'driving'
}, function ( results, status) {
    var currentDate = new Date();
    console.log('"To ODOT From Home",'+weekday[currentDate.getDay()]+','+currentDate.getHours()+':'+currentDate.getMinutes()+','+status.json.routes[0].legs[0].duration.value);
});

googleMapsClient.directions({
    origin: destPt,
    destination: originPt,
    mode: 'driving'
}, function ( results, status) {
    var currentDate = new Date();
    console.log('"From ODOT To Home",'+weekday[currentDate.getDay()]+','+currentDate.getHours()+':'+currentDate.getMinutes()+','+status.json.routes[0].legs[0].duration.value);
});

