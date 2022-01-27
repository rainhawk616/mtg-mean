import * as express from 'express';
import { Router } from 'express';
import { CardService } from '../services/CardService';
import { DataTypesService } from '../services/DataTypesService';

export class ApiController {
  private readonly router: Router;
  private readonly services: { CardService: CardService, DataTypesService: DataTypesService };

  constructor(services: { CardService: CardService, DataTypesService: DataTypesService }) {
    this.services = services;
    this.router = express.Router();

    this.router.get('/data-types', async (req, res, next) => {
      res.json(await this.services.DataTypesService.find());
    });

    this.router.post('/search', async (req, res, next) => {
      res.json(await this.services.CardService.search(req.body));
    });
  }

  public getRouter() {
    return this.router;
  }
}
