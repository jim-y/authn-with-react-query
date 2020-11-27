import { injectable, inject } from 'tsyringe';
import User from './User.model';

@injectable()
export default class AuthService {
  constructor(@inject('DummyUser') private dummyUser: User) {}

  async validateCredentials(email: User['email'], password: User['password']) {
    if (
      email !== this.dummyUser.email ||
      password !== this.dummyUser.password
    ) {
      throw new Error('Invalid user credentials');
    }
  }
}
