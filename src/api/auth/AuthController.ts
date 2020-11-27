import { injectable, inject } from 'tsyringe';
import AuthService from './AuthService';
import type { NextApiRequest, NextApiResponse } from 'next';
import qs from 'querystring';
import { controller, post } from 'src/utils';

@injectable()
@controller
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
}
