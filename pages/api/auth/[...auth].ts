import nc from 'next-connect';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
import 'reflect-metadata';
import { container } from 'tsyringe';
import '@api/auth/injector';
import AuthController from '@api/auth/AuthController';
import { Controller } from 'src/types';
import logger from 'morgan';

const FileStore = sessionFileStore(session);
const ctrl: Controller = container.resolve(AuthController);
const sessionConfig = {
  secret: process.env.SESS_SECRET,
  store: new FileStore({}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: true,
    secure: false,
    httpOnly: true,
    maxAge: 10 * 60000 // 60 mins
  }
};

const handler = nc()
  .use(logger('short'))
  .use(session(sessionConfig))
  .all(ctrl.router());

export default handler;
