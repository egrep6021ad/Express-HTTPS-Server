const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
require('dotenv').config({ path: './.piss_off.env' })

const app = express();
app.use(express.static(path.join(__dirname, './flow/build')));

const options = {
    key: fs.readFileSync("./server.key","utf8"), // Path to key
    cert: fs.readFileSync("./flow-crt.crt","utf8"), //Path to certificate
    ca: [fs.readFileSync("./bundle1.crt","utf8"), fs.readFileSync("./bundle2.crt","utf8"), fs.readFileSync("./bundle3.crt","utf8")]
}



const https_port = process.env.SOLID_PORT;
const http_port = process.env.NULL_PORT;
 
  const ts = Date.now();
  const date_ob = new Date(ts);
  const date = date_ob.getDate();
  const month = date_ob.getMonth() + 1;
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours()-4;
  const min = date_ob.getMinutes();
  const sec = date_ob.getSeconds();
  const my_date = year + "-" + month + "-" + date + '\t@ ' + hours+':'+min+':'+sec;

http.createServer((req,res) => {
	console.log('http: ' + my_date);
	res.writeHead(301, { "Location":"https://foothillsflowyoga.com"})
	res.end();
}).listen(http_port);

app.get('/*', (req, res) => {
 	res.writeHead(301, { "Location":"https://foothillsflowyoga.com"})
        res.end();
})

https.createServer(options, app).listen(https_port,() => {
  console.log('HTTPS hit: ' + my_date)
  console.log('Front-end Server Active \n(https port ' + https_port + ")\n(http port: " + http_port + ")\n");
});
