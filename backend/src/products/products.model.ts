import { Prisma } from "@prisma/client";

export class Products implements Prisma.ProductsCreateInput {
    productId: string;
    name: string;
    price: number;
    rating: number;
    stockQuantity: number;
}

// productId     String      @id
// name          String
// price         Float
// rating        Float?
// stockQuantity Int
// Sales         Sales[]
// Purchases     Purchases[] 