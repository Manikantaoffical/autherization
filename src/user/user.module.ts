import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { Product, ProductSchema } from './schema/product.schema';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema},{name: Product.name, schema: ProductSchema}])],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class UserModule {}
