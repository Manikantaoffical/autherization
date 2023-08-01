import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/roles/roles.enum";
@Schema({ timestamps: true })

export class User extends Document{
    @Prop()
    username: string
    @Prop()
    email: string
    @Prop()
    password: string
    @Prop({required: true})
    role: Role[]
}

export const UserSchema = SchemaFactory.createForClass(User);