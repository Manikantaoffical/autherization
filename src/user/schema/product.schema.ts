import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({ timestamps: true })

export class Product extends Document{
    @Prop()
    productName: string
    @Prop()
    productSize: string
    @Prop()
    productImage: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);