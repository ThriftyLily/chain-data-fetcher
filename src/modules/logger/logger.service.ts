import {
  ConsoleLogger,
  Injectable,
  LoggerService as AppLogger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export class LoggerServiceContext {
  service?: string;

  static toString(o: LoggerServiceContext): string {
    let out = '';

    if (o.service) {
      out = out.concat(`Service: ${o.service}, `);
    }

    return out;
  }
}

@Injectable()
export class LoggerService extends ConsoleLogger implements AppLogger {
  constructor(private readonly configService: ConfigService) {
    super();

    const order = [
      this.logVerbose,
      this.logDebug,
      this.logInfo,
      this.logWarns,
      this.logErrors,
    ];
    for (let i = 0; i < order.length; i++) {
      if (order[i] === true) {
        for (let j = i; j < order.length; j++) {
          order[j] = true;
        }
        break;
      }
    }
    [
      this.logVerbose,
      this.logDebug,
      this.logInfo,
      this.logWarns,
      this.logErrors,
    ] = order;

    this.verbose(`Creating LoggerService`, {});
  }

  private readonly logErrors =
    this.configService.get<string>('LOG_ERRORS') === 'true';
  private readonly logWarns =
    this.configService.get<string>('LOG_WARNS') === 'true';
  private readonly logInfo =
    this.configService.get<string>('LOG_INFO') === 'true';
  private readonly logDebug =
    this.configService.get<string>('LOG_DEBUG') === 'true';
  private readonly logVerbose =
    this.configService.get<string>('LOG_VERBOSE') === 'true';

  error(message: any, stack?: string, context?: LoggerServiceContext | string) {
    if (this.logErrors) {
      if (context && typeof context === 'object') {
        context = LoggerServiceContext.toString(context);
      }
      return context
        ? super.error(message, stack, context)
        : super.error(message, stack);
    }
  }

  log(message: any, context?: LoggerServiceContext | string) {
    if (this.logInfo) {
      if (context && typeof context === 'object') {
        context = LoggerServiceContext.toString(context);
      }
      return context ? super.log(message, context) : super.log(message);
    }
  }

  warn(message: any, context?: LoggerServiceContext | string) {
    if (this.logWarns) {
      if (context && typeof context === 'object') {
        context = LoggerServiceContext.toString(context);
      }
      return context ? super.warn(message, context) : super.warn(message);
    }
  }

  debug(message: any, context?: LoggerServiceContext | string) {
    if (this.logDebug) {
      if (context && typeof context === 'object') {
        context = LoggerServiceContext.toString(context);
      }
      return context ? super.debug(message, context) : super.debug(message);
    }
  }

  verbose(message: any, context?: LoggerServiceContext | string) {
    if (this.logVerbose) {
      if (context && typeof context === 'object') {
        context = LoggerServiceContext.toString(context);
      }
      return context ? super.verbose(message, context) : super.verbose(message);
    }
  }
}
