import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { Products } from "./products.model";
import { Request, Response } from "express";
import { ProductsService } from "./products.service";

@Controller('api/v1/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }
    @Get()
    async getProducts(@Req() req: Request, @Res() res: Response<any>) {
        const result = await this.productsService.getProducts();
        
        return res.status(200).json({
            status: 'OK!',
            message: "successfully fetched products",
            data: result
        });
    }
}