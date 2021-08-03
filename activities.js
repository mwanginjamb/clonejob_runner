const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');


const PORT = 3001;

app = express();

const logPath = path.resolve("logs/fms-log.txt");

const cmd = `wget -a ${logPath} http://keklf-hrm52.kwtrp.org/fms/syncactivities`;
//const del = `node delete.js`;



// Test the server

app.use('/',(req,res) => {
    res.send(`Server running on port : ${PORT}`);
});

cron.schedule('* * * * *', () => {
    console.log('-------------------------');
    console.info('Running Cron Job');

    let currentdate = new Date(); 
    let datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    if(shell.exec(cmd).code !== 0){
        shell.exit(1);
    }
    else{
        shell.echo(`KEMRI FMS GRANT ACTIVITIES Synchronization thread completed @ ${datetime}. Hurray...`);
    }

    /*if(shell.exec(del).code !== 0) {
        shell.exit(1)
    }else{
        shell.echo('Unable to delete log files.');
    }*/
});



app.listen(PORT);