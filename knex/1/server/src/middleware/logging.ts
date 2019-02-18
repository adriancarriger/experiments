import * as uuid from 'uuid';
import * as morgan from 'morgan';

export function assignId(request, response, next) {
  request.id = uuid.v4();
  next();
}

morgan.token('id', (request: any) => request.id);

export const routeLogger = morgan(
  '[:id] :method :url :status :response-time ms - :res[content-length]',
  {
    stream: {
      write: logMessage => {
        console.log(logMessage);
      }
    }
  }
);
