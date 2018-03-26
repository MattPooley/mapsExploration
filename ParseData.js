var fs = require('fs');

var fileMap = {
    "To Conv From Home":'ToConv.csv',
    "From Conv To Home":'FromConv.csv',
    "To ODOT From Home":'ToODOT.csv',
    "From ODOT To Home":'FromODOT.csv',
};

var getFileName = function ( text ) {
    for ( var mapEntry in fileMap ) {
        if ( text === mapEntry )
            return fileMap[mapEntry];
    }
    return 'Unknown.csv';
};

var previousDay = function ( day ) {
    if ( day === 'Saturday') return 'Friday';
    if ( day === 'Sunday') return 'Saturday';
    if ( day === 'Monday') return 'Sunday';
    if ( day === 'Tuesday') return 'Monday';
    if ( day === 'Wednesday') return 'Tuesday';
    if ( day === 'Thursday') return 'Wednesday';
    if ( day === 'Friday') return 'Thursday';
}

var getLocalTime = function ( day, time ) {
    var timeSplit = time.split(':');
    var hour = parseInt(timeSplit[0]) - 8 ;
    if ( hour < 0 ) { 
        hour = hour + 24;
        day = previousDay(day);
    }
    return day + ' ' + hour.toString() + ':' + timeSplit[1];
};

var parseFile = function ( fileName ) {
    var array = fs.readFileSync(fileName, 'utf8').toString().replace(/"/g,'').split('\n');
    for ( i in array ) {
        if ( array[i].length > 0 ) {
            var tokens = array[i].split(',');
            if ( tokens[0] !== undefined && tokens[0] !== null ) {
                var outFile = getFileName(tokens[0]);
                var timeStamp = getLocalTime(tokens[1], tokens[2]);
                fs.appendFileSync(outFile,timeStamp+','+tokens[3]+'\n','utf8');
            }
        }
    }
};

parseFile('RouteInfoODOT.log');
parseFile('RouteInfoConv.log');