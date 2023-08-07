import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { ProductDto } from './dto/product.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/adduser')
  async adduser(@Body() req: SignInDto) {
    try{
      const addUser = await this.userService.register(req);
      return addUser
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @Post('/loginUser')
  async login(@Body() req: SignUpDto) {
    try{
      const signUpUser = await this.userService.loginUser(req);
      return signUpUser
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/addProduct')
  async addProduct(@Body() req: ProductDto) {
    try{
      const addproduct = await this.userService.createProduct(req);
      return addproduct
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/getprodlist')
  async getList() {
    try{
      const list = await this.userService.getProducts();
      return list
    } catch(error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }
}
