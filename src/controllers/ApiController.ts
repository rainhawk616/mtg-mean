import * as express from 'express';
import { Router } from 'express';
import { CardService } from '../services/CardService';

export class ApiController {
  private readonly router: Router;
  private readonly services: { CardService: CardService };

  constructor(services: { CardService: CardService }) {
    this.services = services;
    this.router = express.Router();

    this.router.get('/enums', function (req, res, next) {
      // Object.keys(Types).map(type => {})
      // res.json(EnumValues);
    });

    this.router.post('/search', async (req, res, next) => {
      res.json(await this.services.CardService.search(req.body));
    });
  }

  public getRouter() {
    return this.router;
  }
}
