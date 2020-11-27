export interface Route {
  path: string;
  method: string;
  action: string;
}

export interface Controller {
  router?: any;
  [others: string]: any;
}

export interface ControllerCache {
  [className: string]: Route[];
}
