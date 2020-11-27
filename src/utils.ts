import { Controller, ControllerCache, Route } from './types';

const controllers: ControllerCache = {} as ControllerCache;

export function controller(target: any) {
  if (!controllers[target.name]) {
    controllers[target.name] = [];
  }

  target.prototype.router = function (param: string) {
    const ctrl: Controller = this;
    const routes = controllers[target.name];
    return async function (req, res) {
      const { query } = req;
      const pathArray: string[] = query[param];
      const path: string = `/${pathArray.join('/')}`;
      const method: string = req.method;
      const route: Route = routes.find(
        (route) =>
          route.method?.toLowerCase() === method.toLowerCase() &&
          route.path?.toLowerCase() === path.toLowerCase()
      );
      if (!route) {
        res.status(404).send('Not found!');
      } else {
        await ctrl[route.action](req, res);
      }
    };
  };
}

export function post(path?) {
  return function decorator(target, name, descriptor) {
    const className: string = target.constructor.name;

    if (!controllers[className]) {
      controllers[className] = [];
    }

    if (!controllers[className][name]) {
      controllers[className].push({
        method: 'post',
        action: name,
        path: path ?? name
      } as Route);
    }

    return descriptor;
  };
}
