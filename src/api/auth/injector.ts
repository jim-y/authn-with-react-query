import { container } from 'tsyringe';

import AuthController from './AuthController';
import AuthService from './AuthService';
import User from './User.model';

container.register<AuthController>(AuthController, {
  useClass: AuthController
});
container.register<AuthService>(AuthService, { useClass: AuthService });

container.register<User>('DummyUser', {
  useValue: {
    email: 'asd@asd.com',
    password: 'asd'
  }
});
