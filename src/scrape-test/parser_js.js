"use strict";
var http = require("http");
const spawn = require("child_process").spawn;
var url = "https://fixr.co/transfer-ticket/e2966672c36fcc2b3f5d737f";
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    const parser_script = require('python-shell').PythonShell;
    var script_options = { args: [url] };
    parser_script.run('./parser_test.py', script_options, function (err, info) {
        if (err)
            throw err;
        var ticket_no = info[0];
        var ticket_title = info[1];
        var ticket_name = info[2];
        var ticket_type = info[3];
        var ticket_category = info[4];
        var open_time = info[5];
        var last_entry = info[6];
        var ticket_url = info[7];
        var summary = `Ticket No: ${ticket_no}\nTicket Title: ${ticket_title}\nTicket Name: ${ticket_name}\nTicket Type: ${ticket_type}\nTicket Category: ${ticket_category}\nOpen Time: ${open_time}\nLast Entry: ${last_entry}\nURL: ${ticket_url}`;
        response.end(summary);
    });
}).listen(8081);
console.log("Server running at http://127.0.0.1:8081");
