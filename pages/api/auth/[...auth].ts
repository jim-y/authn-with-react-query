import nc from 'next-connect';
import session from 'express-session';
import 'reflect-metadata';
import { container } from 'tsyringe';
import '@api/auth/injector';
import AuthController from '@api/auth/AuthController';
import { Controller } from 'src/types';
import logger from 'morgan';

const ctrl: Controller = container.resolve(AuthController);
const sessionConfig = {
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    path: '/',
    httpOnly: true,
    maxAge: 60000
  }
};

const handler = nc()
  .use(logger('short'))
  .use(session(sessionConfig))
  .all(ctrl.router('auth'));

export default handler;
