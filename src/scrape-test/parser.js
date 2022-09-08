var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var http = require("http");
var axios = require('axios');
var url = "https://fixr.co/transfer-ticket/e2966672c36fcc2b3f5d737f";
http.createServer(function (request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var result, ticket_num, ticket_title, ticket_name, ticket_type, ticket_category, opening_time, last_entry, summary;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    response.writeHead(200, { 'Content-Type': 'text/plain' });
                    return [4 /*yield*/, scrape()];
                case 1:
                    result = _a.sent();
                    ticket_num = result[1];
                    ticket_title = result[2];
                    ticket_name = result[4];
                    ticket_type = result[6];
                    ticket_category = result[8];
                    opening_time = result[10];
                    last_entry = result[12];
                    summary = "Ticket No: ".concat(ticket_num, "\nTicket Title: ").concat(ticket_title, "\nTicket Name: ").concat(ticket_name, "\nTicket Type: ").concat(ticket_type, "\nTicket Category: ").concat(ticket_category, "\nOpen Time: ").concat(opening_time, "\nLast Entry: ").concat(last_entry, "\nURL: ").concat(url);
                    console.log(summary);
                    response.end(summary);
                    return [2 /*return*/];
            }
        });
    });
}).listen(8083);
function scrape() {
    return __awaiter(this, void 0, void 0, function () {
        var axios_result, pattern, htmlString, parsingString, html_tag, tbd_symbol, denominator, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.get(url)];
                case 1:
                    axios_result = _a.sent();
                    pattern = '<section class="sc-1md1qs5-5 eLYqFu">.*?</section>';
                    htmlString = axios_result.data;
                    parsingString = (htmlString.match(pattern))[0];
                    html_tag = /<.*?>/g;
                    tbd_symbol = /—/g;
                    denominator = '/';
                    result = parsingString.replace(html_tag, denominator).replace(tbd_symbol, 'TBD').split(denominator).filter(function (element) { return element !== ''; });
                    return [2 /*return*/, result];
                case 2:
                    err_1 = _a.sent();
                    console.error(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
console.log("Server running at http://127.0.0.1:8083");
