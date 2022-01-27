import createError, { HttpError } from "http-errors";
import _debug from 'debug';
import express, { json, urlencoded, static as _static, NextFunction} from 'express';
import session from 'express-session';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { ApiController } from './controllers/ApiController';
import IndexController from './controllers/IndexController';
import { Application } from "express";
import { Db, MongoClient } from "mongodb";
import { CardService } from "./services/CardService";
import dotenv from 'dotenv';
import { nextTick } from "process";
import { DataTypesService } from "./services/DataTypesService";
import { Session } from "inspector";

dotenv.config();

export default class App {
  private app: Application;
  private mongoClient:MongoClient;
  private db:Db;
  private services: { CardService:CardService, DataTypesService: DataTypesService};

  constructor(port:any) {
    if(!process.env.MONGODB_URL) {
      throw new Error('process.env.MONGODB_URL is required');
    }

    this.mongoClient = new MongoClient(process.env.MONGODB_URL);
    this.mongoClient.connect();
    
    this.db = this.mongoClient.db('mtg-mean');
    this.services = {
        CardService: new CardService(this.db),
        DataTypesService: new DataTypesService(this.db),
    }


    this.app = express();

    const sessionConfig:session.SessionOptions = {
      secret:'test',
      resave:false,
      saveUninitialized:false,
      cookie : {
        sameSite: 'strict', // THIS is the config you are looing for.
      }
    };

    this.app.use(session(sessionConfig));

    // view engine setup
    this.app.set('views', join(__dirname, '../src/views'));
    this.app.set('view engine', 'ejs');

    this.app.use(logger('dev'));
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(_static(join(__dirname, '../src/public')));
    // app.use('/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
    // app.use('/javascripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
    // app.use('/javascripts', express.static(__dirname + '/node_modules/jquery/dist'));
    // app.use('/stylesheets', express.static(__dirname + '/node_modules/mana-font/css'));
    // app.use('/fonts', express.static(__dirname + '/node_modules/mana-font/fonts'));

    this.app.use('/', new IndexController().getRouter());
    this.app.use('/api', new ApiController(this.services).getRouter());
    

    this.app.use('/app', _static('dist/app'));
    this.app.get('/app/*', (req,res,next)=>{
      res.status(200).sendFile(__dirname + '/app/index.html');
    });

    // this.app.all('/app', (req, res) => {
    //   res.status(200).sendFile(__dirname + '/app/index.html');
    // });

    // catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    this.app.use(function (err:HttpError, req:any, res:any, next:NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    this.app.set('port', port);
  }

  public listen() {
    this.app.listen();
  }

  public getApp() {
    return this.app;
  }
}