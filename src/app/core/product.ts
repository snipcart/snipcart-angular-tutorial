import { Flavor } from "./flavor";
import { Size } from "./size";

export interface Product {
    id: number;
    name: string;
    imageUrls: string[];
    price: number;
    flavors: Flavor[];
    sizes: Size[];
}