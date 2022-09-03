var http = require("http");
const spawn = require("child_process").spawn;

var url = "https://fixr.co/transfer-ticket/e2966672c36fcc2b3f5d737f"

http.createServer(function(request: any, response: any) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    const parser_script = require('python-shell').PythonShell;
    var script_options = {args: [url]}
    parser_script.run('./parser_test.py', script_options, function (err: any, info: string) {
        if (err) throw err;
        var ticket_no: string = info[0]
        var ticket_title: string = info[1]
        var ticket_name: string = info[2]
        var ticket_type: string = info[3]
        var ticket_category: string = info[4]
        var open_time: string = info[5]
        var last_entry: string = info[6]
        var ticket_url: string = info[7]
        var summary: string =  `Ticket No: ${ticket_no}\nTicket Title: ${ticket_title}\nTicket Name: ${ticket_name}\nTicket Type: ${ticket_type}\nTicket Category: ${ticket_category}\nOpen Time: ${open_time}\nLast Entry: ${last_entry}\nURL: ${ticket_url}`
        response.end(summary);
    });
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");