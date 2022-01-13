var express = require('express');
import { Router } from 'express';

export default class IndexController {
  private router:Router;

  constructor() {
    this.router = express.Router();

    this.router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });
  }

  getRouter(): Router {
    return this.router;
  }

}
