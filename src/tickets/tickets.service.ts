import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as puppeteer from 'puppeteer';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    private readonly httpService: HttpService,
  ) {}

  async create(ticketUrl: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(ticketUrl);

    await page.evaluate(() => {
      const propertyList = [];

      console.log(document.querySelector('.sc-1md1qs5-5 eLYqFu'));
    });
  }
}
