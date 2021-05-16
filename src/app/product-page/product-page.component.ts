import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Flavor } from '../core/flavor';
import { Product } from '../core/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  imageUrl: string = "";
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
    return this.product?.flavors?.map(flavor => flavor.name).join("|") ?? "yolii";
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join("|") ?? "yolii";
  }

  setImageUrl(flavor: Flavor): void {
    const flavorImageUrl = this.product?.imageUrls.find(url => url.includes(flavor.name));
    if (!flavorImageUrl) {
      throw Error(`No flavor for ${flavor.name} value`);
    }
    this.imageUrl = flavorImageUrl;
  }

  ngOnInit() {
    this.getProduct();
    this.imageUrl = this.product?.imageUrls[0] ?? ''; //TODO refactor code
  }
}
