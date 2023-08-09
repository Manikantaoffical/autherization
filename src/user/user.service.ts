import { HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ProductDto } from './dto/product.dto';
import { Product } from './schema/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    private readonly authService: AuthService
  ) {}

  async register(req: SignInDto) {
    try {
      const findUser = await this.userModel.findOne({ email: req.email });
      if (!findUser) {
        const bcryptPassword = await this.authService.hashPassword(
          req.password,
        );
        const addUser = await this.userModel.create({
          username: req.username,
          email: req.email,
          password: bcryptPassword,
          role: req.role
        });
        return addUser;
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid Request',
        };
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async loginUser(req: SignUpDto):Promise<{token: string} | any> {
    try {
      const findUser = await this.userModel.findOne({ email: req.email });
    //   console.log(findUser);
      if (!findUser) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'User Not Found',
        };
      } else {
        const matchPassword = await this.authService.comparePassword(
          req.password,
          findUser.password,
        );
        // console.log(matchPassword);
        if (matchPassword) {
        const jwtToken = await this.authService.createToken({findUser});
        //   console.log(jwtToken);
          return {
            token: jwtToken,
            userData: findUser,
          };
        } else {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Password incorrect",
            }
        }
      }
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      };
    }
  }

  async createProduct(req: ProductDto, image: Express.Multer.File[]) {
    try{
      if (image) {
        const reqDoc = image.map((doc, index) => {
            let IsPrimary = false
            if (index == 0) {
                IsPrimary = true
            }
            const randomNumber = Math.floor((Math.random() * 1000000) + 1);
            return doc.filename
            
        })

        req.productImage = reqDoc.toString()
    }
        const addprod = await this.productModel.create(req);
        if(addprod) {
            // console.log(process.env.JWT_SECRET);
            return {
                statusCode: HttpStatus.OK,
                message: "Product Added Successfully",
                data: addprod,
            }
        } else {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Invalid Request",
            }
        }
    } catch(error) {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: error,
        }
    }
  }

  async getProducts() {
    try{
      const findProducts = await this.productModel.find();
      if(findProducts) {
        return {
          statusCode: HttpStatus.OK,
          message: "List of products",
          data: findProducts,
        } 
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Invalid Request",
        }
      }
    } catch(error) {
      return{
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error,
      }
    }
  }
}
