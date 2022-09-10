import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { TicketDto } from '../dtos/ticket.dto';

interface ClassConstructor {
  // For any classes
  // eslint-disable-next-line @typescript-eslint/ban-types
  new (...args: any[]): {};
}

export function SerializeTicket(
  dto: ClassConstructor,
): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(TicketDto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
