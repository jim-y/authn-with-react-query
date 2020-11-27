import { Controller, ControllerCache, Route } from './types';
import { join } from 'path';

const controllers: ControllerCache = {} as ControllerCache;

export function controller(prefix: string) {
  return function (target: any) {
    if (!controllers[target.name]) {
      controllers[target.name] = [];
    }

    target.prototype.router = function () {
      const ctrl: Controller = this;
      const routes = controllers[target.name];
      return async function (req, res) {
        const { query } = req;
        const pathArray: string[] = query[prefix];
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
  };
}

function getDecorator(method, path?) {
  return function (target, name, descriptor) {
    const className: string = target.constructor.name;

    if (!controllers[className]) {
      controllers[className] = [];
    }

    if (!controllers[className][name]) {
      controllers[className].push({
        method,
        action: name,
        path: path ? join('/', path) : `/${name}`
      } as Route);
    }

    return descriptor;
  };
}

export function post(path?) {
  return getDecorator('post', path);
}

export function get(path?) {
  return getDecorator('get', path);
}
