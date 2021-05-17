import { Flavor } from "./flavor";
import { Size } from "./size";

export interface SelectedProductAttributes {
    flavor: Flavor | undefined;
    size: Size | undefined;
}