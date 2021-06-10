const cron = require('node-cron');
const express = require('express');
const shell = require('shelljs');
const path = require('path');

const PORT = 3000;

app = express();

const logPath = path.resolve("logs/fms-log.txt");

const cmd = `wget -a ${logPath} http://172.16.14.152/fms`;



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
        shell.echo(`KEMRI FMS Synchronization thread completed @ ${datetime}. Hurray...`);
    }
});


app.listen(PORT);