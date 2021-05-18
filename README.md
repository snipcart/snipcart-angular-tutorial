# Snipcart Angular Tutorial
Because summer is coming in Canada and its been quite a long year, I wanted to replenish my youth memories and make an **REPLENISHING ICE CREAM STORE**!

## Angular setup

Let's first install the Angular CLI. It's a neat tool Angular provides that automates many development tasks. To install it, open a terminal and type the following command:

`npm install -g @angular/cli`

Once installed, create a new project with the following command:
`ng new snipcart-angular`

A prompt will appear asking you if you want to enable strict mode. Select yes. This will enable a few other settings that will help to catch bugs ahead of time.

In your directory you now see your project repo. Type the following commands to go in it:
```
cd snipcart-angular
ng serve --open
```
ng serve will build the app, while the --open option will open up a browser to `http://localhost:4200/`. You should now see Angular generic template page.

### Customizing the html template
Now that the general project setup is done. Let's start customizing it!

First of all, open the `app.component.ts` file and change the value of the title property for 'Ice cream store'.

Afterwards, open the `app.component.html` file and remove all of the template section, replacing it by `<h1>{{title}}</h1>`. The final result should look like this:

```html
<h1>{{title}}</h1>
<router-outlet></router-outlet>
```

Afterwards, the browser should reload instantly, displaying only the new title.

#### Customizing the stylesheet

For help with our styling, we will use the angular material components. These components made by the material team are an implementation of [material design](https://material.io/). They will allow us to quickly create a fast, design tested e-commerce.

Let's use the following command to install material UI: `ng add @angular/material`


You can then replace `src/app.component.scss`.

### Creating mock products
Later in the tutorial, we will use a full InMemoryDbService. For now, let's do something simple and simply create a `mock-products.ts` file in our root component:
```ts
import { Product } from './core/product';
import { Size } from './core/size';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ice Cream',
    imageUrls: ['../assets/ice-cream-prune.svg', '../assets/ice-cream-cherry.svg', '../assets/ice-cream-squash.svg'],
    price: 10,
    flavors: [
      { name: 'prune', color: '#5A188E' },
      { name: 'squash', color: '#F88532' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.MEDIUM, Size.LARGE],
  },
  {
    id: 2,
    name: 'Popsicle',
    imageUrls: ['../assets/popsicle-lime.svg', '../assets/popsicle-lettuce.svg', '../assets/popsicle-cherry.svg'],
    price: 8,
    flavors: [
      { name: 'lime', color: '#00CACA' },
      { name: 'lettuce', color: '#80DC0B' },
      { name: 'cherry', color: '#E91E63' },
    ],
    sizes: [Size.SMALL, Size.LARGE],
  },
];
```

You will also need to create a `core` folder that will contain our typescript product interface as well as a flavor and size interface we will use to better fulfill our customer's wishes!

```ts
// core/product.ts

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
```

```ts
// core/flavor.ts
export interface Flavor {
    name: string;
    color: string;
}
```

```ts
// core/size.ts
export enum Size {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
}
```
## Create a homepage component

Let's now create our website's homepage, where we will display our product header and options.

In your terminal type the following command: `ng generate component homepage`.

Then, let's start by adding props to the homepage. It will be used to display our app title to our website, let's create  2 properties for our app title and subtitle.

```ts
// homepage.component.ts

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  title = 'Infinite summer ice cream store';
  subtitle = 'Which one do you want?';
  }
```

Then let's add the html templating in the corresponding file:

```html
<!-- homepage.component.html -->
<div class="header" fxLayout="column" fxLayoutAlign="center center">
  <h1 class="jumbo">{{ title }}</h1>
  <h2>{{ subtitle }}</h2>
</div>
```

In order to display the homepage view, add the following line to the component:

```html
<!-- app.component.html -->

<app-homepage></app-homepage>

```

You should now see the title and subtitle displayed! But what's a e-commerce homepage header without some product to show?
## Display products: introducing directives
Now that we have a cool header and some nice products, let's display them on our website! We will do it in a separate component that will improve reusability.

In your terminal, create the product-display component by typing the following Angular CLI command: `ng generate component products`.

Now that we have our component, let's first import the products that we need. Angular allows us to do so easily. Simply add the following lines in `product-display-component.ts`:

```ts
import { PRODUCTS } from '../mock-products';
```

And then define the attributes in the component class with the following lines:

```ts
export class ProductsComponent implements OnInit {

  products = PRODUCTS;
}
```

We are now ready to create a product component to give further information about them to our customers.

`ng generate component product`.

Open the newly created `product.component.ts` file and replace it with the following content:

```ts
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
```

The `@Input` decorator we added allow us to declare *input properties*. This means that the component can now receive its value directly from its parent component.

Let's look at what we just created: first, an input property product which binds to the Product object we created in core, and secondly a imageUrl property which we will use to display our product's image. With the line `this.imageUrl = this.product?.imageUrls[0] ?? '';` we then assign to imageUrl the value of the first image in the imageUrls array if it exists, and do so within the ngOnInit method.

ngOnInit is an Angular lifecycle method that gets called after component initialization. Since the component is initialized, the input props, in our case the product prop, is populated and we can access it. This is what allows us to populate the property.

Now that our component properties are defined, we can add them to our html (`product.component.html`):

```html
<ul>
    <app-product *ngFor="let p of products" [product]="p"></app-product>
</ul>
```

Notice the `*ngFor` directive we are using. It allows us to modify the DOM structure by - you guessed it - looping over the elements of the `products` list and creating the specified html node for it (in our case, the app-products node). 

[Directives] such as `*ngFor` are defined in [Angular's official documentation](https://angular.io/guide/built-in-
                                       directives#built-in-structural-directives) as "classes that add additional behavior to elements". In that sense, components are also directives, because they define additional behavior to a standard html template.

### Create a product page: introducing angular routing

Open `app-routing.module.ts` and insert the following into routes:

```ts
const routes: Routes = [
  {path: "**", component: HomepageComponent},
];
```

We can now add a dynamic route.

```ts
const routes: Routes = [
  {path: "product/:id", component: ProductPageComponent},
  {path: "**", component: HomepageComponent},
];
```
The "**" path is a wildcard route, generally used for 404 pages. It's important to add the wildcard route last, otherwise it will override the other routes.

In `app.component.html`, `<router-outlet></router-outlet>` will display the component related to the route. So in your browser, you can now go to `http://localhost:4200/` and it will point to our homepage!

## Create product page component: discovering services

Components are responsible for data presentation, to improve our application modularity, they shouldn't access the application data directly. Instead, they should interact with **services** which handle data access.

Let's refactor our `products` component so that it uses a service to handle data access. For now, this service will use mock data.

In the terminal, enter the following command: `ng generate service product`.

In te newly created `product.service.ts` fil, add the following content:

```ts
import { Injectable } from '@angular/core';
import { PRODUCTS } from './mock-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return PRODUCTS;
  }
```

The `getProducts` method simply return our mock data. Later in the tutorial we will modify it to make it even more modular. Then, in `products.component.ts` replace the mock products assignation by a call from product service:

```ts
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  getProducts(): void {
    this.products = this.productService.getProducts();
  }

  ngOnInit() {
    this.getProducts();
  }
}
```

We have done 4 things here: first, we replaced the value of products with an empty array, secondly, we injected the productService in our constructor. Then we defined a getProducts method in our component that handles the products logic. Lastly, we called that method in the ngOnInit lifecycle method.

Now for our product page, we will need data about a single product, let's add a `getProduct` method to our product service to fetch this data:

```ts
// product.service.ts

getProduct(id: number): Observable<Product | undefined> {
   const product = PRODUCTS.find(product => product.id === id);
   return of(product);
  }
```

This method returns an [observable](https://angular.io/guide/observables) which are used in angular for event handling and, as in our case, asynchronous programming. Later when designing our product page, we will see how to fetch observable values.

Lt's use this method in our product component to display the product content: `ng generate component product`.


```ts
// product.component.ts
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
```
In the typescript file, we added a product input property for the inserted product, along with an `imageUrl` property, which we bind to the component's image src.

```html
// product.component.html
<div [routerLink]="'product/' + product?.id">
  <h2>{{ product?.name }}</h2>
  <img [src]="imageUrl" />
</div>
```

In the html, we also added a router link to a product page, which we have not yet defined. Let's do it now.
### Add product page

First, let's allow our users to select the flavor and size variant they want for their products.

Along with an imageUrl property similar to the one we added to the product component, let's add a `getProduct` method that will get the dynamic parameter from our route and use it to call the corresponding method we defined in product service:

```ts
// in product-page.component.ts
 imageUrl: string = '';
 product: Product | undefined;

 getProduct(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }
```

We can see that the method calls our product service `getProduct` method and *subscribes* to the observable value. When the value from getProduct gets returned, it will be assigned to the `product` property.

Now that we have all of the required data, let's display our product name, image url and price: 

```html
<h1>{{ product?.name }}</h1>
<img [src]="imageUrl" />
<p>Price: {{ product?.price }}</p>)
 ```

```html
<h1>{{ product?.name }}</h1>
<img [src]="imageUrl" />
<p>Price: {{ product?.price }}</p>
<button
  class="snipcart-add-item"
  [attr.data-item-id]="product?.id"
  [attr.data-item-price]="product?.price" 
  [attr.data-item-url]="'product/' + product?.id"
  [attr.data-item-image]="imageUrl"
  [attr.data-item-name]="product?.name">
  Add to cart
  </button>

```

And voilà! You should now be able to complete a test transaction!

## BONUS: Customizing customer consumptions with Snipcart's custom field
If you look at the code repo, you will see I added some logic to create Snipcart's [custom fields](https://docs.snipcart.com/v3/setup/products). These will allow our users to select their ice-cream/popsicles flavor and sizes.

First, I made 2 functions to give us the options separated by `|` caracter, that we will use to populate the buy button's custom option fields.

```ts
  get flavorOptions(): string {
    return (
      this.product?.flavors?.map((flavor) => flavor.name).join('|') ?? ''
    );
  }

  get sizeOptions(): string {
    return this.product?.sizes?.join('|') ?? ''; 
  }
```

Then, I added a dropdown to select product size and chip components to select flavors...

```html
// product-page.component.html
<mat-form-field appearance="fill">
  <mat-label>Size</mat-label>
  <mat-select
    (selectionChange)="
      updateSelectedProductAttributes(
        this.selectedAttributes?.flavor,
        $event.value
      )
    "
    required
  >
    <mat-option *ngFor="let size of product?.sizes" [value]="size">
      {{ size }}
    </mat-option>
  </mat-select>
</mat-form-field>
<mat-chip-list aria-label="Flavors selection">
  <mat-chip
    *ngFor="let flavor of product?.flavors"
    [style.background-color]="flavor.color"
    (click)="
      updateSelectedProductAttributes(flavor, this.selectedAttributes?.size)
    "
  >
    {{ flavor.name }}
  </mat-chip>
</mat-chip-list>
```
..., along with some logic to keep track of the selected values:

```ts
// core/selectedProductAttributes.ts

import { Flavor } from "./flavor";
import { Size } from "./size";

export interface SelectedProductAttributes {
    flavor: Flavor | undefined;
    size: Size | undefined;
}
```
```ts
// product-page.component.ts
// (...)
export class ProductPageComponent implements OnInit {
  imageUrl: string = '';
  selectedAttributes: SelectedProductAttributes = {
    flavor: undefined,
    size: undefined,
  };
  product: Product | undefined;
// (...)
```



Now we simply have to add the custom field attributes to Snipcart's buy button:

```html
<button
  class="snipcart-add-item"
  [attr.data-item-id]="product?.id"
  [attr.data-item-price]="product?.price" 
  [attr.data-item-url]="'product/' + product?.id"
  [attr.data-item-image]="imageUrl"
  [attr.data-item-name]="product?.name"
  

  data-item-custom1-name="Flavor"
  [attr.data-item-custom1-options]="flavorOptions"
  [attr.data-item-custom1-value]="this.selectedAttributes?.flavor?.name"
  data-item-custom2-name="Size"
  [attr.data-item-custom2-options]="sizeOptions"
  [attr.data-item-custom2-value]="this.selectedAttributes?.size"
>Add to cart</button>
```
## Conclusion
I had a lot of fun writing this demo. I had worked with angular 8 a couple of years ago, and was a bit scared to go back to it, afraid their would be a lot of boilerplate code. However, I became pleasantly surprised in using angular opinionated architecture, as I found it helped me to create a more modular app. 
