import { injectable, inject } from 'tsyringe';
import AuthService from './AuthService';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';
import { controller, post, get } from 'src/utils';

@injectable()
@controller('auth')
export default class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  @post('/login')
  async authenticate(
    req: NextApiRequest & { session: any },
    res: NextApiResponse
  ) {
    const { email, password } = qs.parse(req.body);

    try {
      await this.authService.validateCredentials(
        email as string,
        password as string
      );
      req.session.user = {
        email
      };
      res.status(200).send('Ok');
    } catch (error) {
      console.error(error);
      res.status(401).send('Unauthorized');
    }
  }

  @post()
  async logout(req: NextApiRequest & { session: any }, res: NextApiResponse) {
    if (req.session.user) {
      req.session.destroy(function (err) {
        if (err) {
          res.status(400).send('Not existing session');
        } else {
          res.status(200).send('Ok');
        }
      });
    } else {
      res.status(200).send('Ok');
    }
  }

  @get('/session')
  async getSession(
    req: NextApiRequest & { session: any },
    res: NextApiResponse
  ) {
    if (req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).send('Unauthorized');
    }
  }
}
