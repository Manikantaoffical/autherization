import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/roles/roles.guard';

@Module({
  imports: [JwtModule.registerAsync({
    useFactory: () => ({
      secretOrKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '10s'
      }
    })
  })],
  providers: [AuthService, JwtGuard, JwtStrategy,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class AuthModule {}
