import * as core from 'express-serve-static-core';

export const asyncMiddleware = fn => (
  request: core.Request,
  response: core.Response,
  next: core.NextFunction
) => {
  Promise.resolve(fn(request, response, next)).catch(next);
};

export function asyncRoute(fn: () => Promise<any>) {
  return asyncMiddleware(async (request: core.Request, response: core.Response) => {
    response.json(await fn());
  });
}
