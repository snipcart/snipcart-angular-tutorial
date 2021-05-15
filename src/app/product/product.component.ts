import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../core/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product | undefined;
  imageUrl :string = "";
  
  ngOnInit() {
   this.imageUrl = this.product?.imageUrls[0] ?? '';
  }
}