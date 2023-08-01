import { Injectable } from '@nestjs/common';
import {
  MongooseOptionsFactory,
  MongooseModuleOptions,
} from '@nestjs/mongoose';
import { loadEnvironmentVariables } from './loader';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    loadEnvironmentVariables();

    return {
      // uri:"",
      uri: 'mongodb+srv://manidb:manikanta@cluster0.laz6d.mongodb.net/auth6?retryWrites=true&w=majority',
      
       //useCreateIndex: true
      //  useNewUrlParser: true,
      //  useCreateIndex: true,
       autoIndex: true,
      //  useUnifiedTopology: true,
    };
  }
}
