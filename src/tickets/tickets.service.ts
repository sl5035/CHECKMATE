import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as http from 'http';
import { PythonShell } from 'python-shell';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    private readonly httpService: HttpService,
  ) {}

  async create(ticketUrl: string): Promise<Ticket> {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(ticketUrl);

    // await page.evaluate(() => {
    //   const propertyList = [];

    //   console.log(document.querySelector('.sc-1md1qs5-5 eLYqFu'));
    // });

    //     http
    //       .createServer((req: any, res: any) => {
    //         res.writeHead(200, { 'Content-Type': 'text/plain' });

    //         const parser_script = PythonShell;
    //         const script_options = { args: [ticketUrl] };
    //         parser_script.run(
    //           './parser_test.py',
    //           script_options,
    //           (err: any, output: string[]) => {
    //             if (err) throw err;

    //             const ticket_no: string = output[0];
    //             const ticket_title: string = output[1];
    //             const ticket_name: string = output[2];
    //             const ticket_type: string = output[3];
    //             const ticket_category: string = output[4];
    //             const open_time: string = output[5];
    //             const last_entry: string = output[6];
    //             const ticket_url: string = output[7];
    //             const summary = `Ticket No: ${ticket_no}\nTicket Title: ${ticket_title}\nTicket Name: ${ticket_name}\nTicket Type: ${ticket_type}\nTicket Category: ${ticket_category}\nOpen Time: ${open_time}\nLast Entry: ${last_entry}\nURL: ${ticket_url}`;
    //             res.end(summary);

    //             console.log(summary);
    //           },
    //         );
    //       })
    //       .listen(8081);
    // TODO: Ticket web scraping
    const ticket = await this.ticketsRepository.create({
      title: 'Test ticket',
      type: 'Test ticket',
      category: 'Test ticket',
      openTime: new Date(),
      lastEntry: new Date(),
      url: 'Test',
      price: 10000,
    });

    return this.ticketsRepository.save(ticket);
  }
}
