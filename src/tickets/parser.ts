import axios from 'axios';
import * as http from 'http';

const url = 'https://fixr.co/transfer-ticket/e2966672c36fcc2b3f5d737f';

http
  .createServer(async function (request: any, response: any) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    const result: string[] = await scrape();
    const ticket_num: string = result[1];
    const ticket_title: string = result[2];
    const ticket_name: string = result[4];
    const ticket_type: string = result[6];
    const ticket_category: string = result[8];
    const opening_time: string = result[10];
    const last_entry: string = result[12];

    const summary = `Ticket No: ${ticket_num}\nTicket Title: ${ticket_title}\nTicket Name: ${ticket_name}\nTicket Type: ${ticket_type}\nTicket Category: ${ticket_category}\nOpen Time: ${opening_time}\nLast Entry: ${last_entry}\nURL: ${url}`;
    console.log(summary);
    response.end(summary);
  })
  .listen(8083);

async function scrape() {
  try {
    const axios_result: any = await axios.get(url);
    const pattern = '<section class="sc-1md1qs5-5 eLYqFu">.*?</section>';
    const htmlString = axios_result.data;
    const parsingString: string = htmlString.match(pattern)[0];
    const html_tag = /<.*?>/g;
    const tbd_symbol = /—/g;
    const denominator = '/';
    const result: string[] = parsingString
      .replace(html_tag, denominator)
      .replace(tbd_symbol, 'TBD')
      .split(denominator)
      .filter((element) => {
        return element !== '';
      });
    return result;
  } catch (err) {
    console.error(err);
  }
}

console.log('Server running at http://127.0.0.1:8083');
