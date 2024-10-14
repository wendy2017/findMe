import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Products } from "./products.model";


@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }
    
    async getProducts(): Promise<Products[]> {
        // const popularProducts = await prisma.products.findMany({
        //     take: 15,
        //     orderBy: {
        //       stockQuantity: "desc",
        //     },
        //   });
        const data = this.prisma.products.findMany({
             take: 15,
            orderBy: {
              stockQuantity: "desc",
            },
     });
     return data;
  }
}
