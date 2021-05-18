import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flavor } from '../core/flavor';
import { Product } from '../core/product';
import { SelectedProductAttributes } from '../core/selectedProductAttributes';
import { Size } from '../core/size';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  imageUrl: string = '';
  selectedAttributes: SelectedProductAttributes = {
    flavor: undefined,
    size: undefined,
  };
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product)); // TODO refactor to getter
  }

  get flavorOptions(): string {
    return (
      this.product?.flavors?.map((flavor) => flavor.name).join('|') ?? 'yolii'
    );
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join('|') ?? 'yolii'; //TODO change default to ""
  }

  setImageUrl(flavor: Flavor): void {
    const flavorImageUrl = this.product?.imageUrls.find((url) =>
      url.includes(flavor.name)
    );
    if (!flavorImageUrl) {
      throw Error(`No flavor for ${flavor.name} value`); // TODO refactor for setter
    }
    this.imageUrl = flavorImageUrl;
  }

  ngOnInit() {
    this.getProduct();
    this.setSelectedAttributes(
      this.product?.flavors[0],
      this.product?.sizes[0]
    );
    if (this.selectedAttributes?.flavor) {
      this.setImageUrl(this.selectedAttributes.flavor);
    }
  }

  public updateSelectedProductAttributes(flavor: Flavor | undefined, size: Size | undefined) {
    this.setSelectedAttributes(flavor ?? {name: "none", color: "#DDD"}, size ?? Size.SMALL);
    if (this.selectedAttributes.flavor) {
      this.setImageUrl(this.selectedAttributes.flavor);
    }
  }

  private setSelectedAttributes(
    flavor: Flavor | undefined,
    size: Size | undefined
  ) {
    this.selectedAttributes = {
      flavor: flavor,
      size: size,
    };
  }
}
