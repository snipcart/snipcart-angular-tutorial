# Snipcart Angular Tutorial
Because summer is coming in Canada and its been quite a long year, I wanted to replenish my youth memories and make an ICE CREAM STORE and because more people will be outside away from computers, let's make it mobile first!

## Angular setup

Let's first install the Angular CLI. It's a neat tool Angular provides that automates many development tasks. To install it, open a terminal and type the following comman:

`npm install -g @angular/cli`

To setup the project repo, the Angular CLI allows you to simply have to type the following command:
`ng new snipcart-angular`

A prompt will appear asking you if you want to enable strict mode. Select yes. This will enable a few other settings helping to catch bugs ahead of time.

Another will appear to ask you the stylesheet of your choice. Choose SCSS.

In your directory you now see your project repo. Type the following commands to go in it:
```
cd angular-tour-of-heroes
ng serve --open
```
ng serve will build the app, while the --open option will open up a browser to `http://localhost:4200/`. You should now see Angular generic template page.

### Customizing the html template
Now that the general project setup is done. Let's modify the repo a bit to personalize our project.

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

TODO further talk about this command.

You can then replace `src/app.component.scss`.

TODO breakdown of module and components concepts (linked to architecture overview below)

## Architecture overview
TODO explain NgModule decorator
## Create products
TODO speak about the product files that were made (product, lavor, size, etc...)
### Creating mock products
Later in the tutorial, we will use a full InMemoryDbService. For now, let's do something simple and simply create a `mock-products.ts` file in our root component:

TODO add the file

## Create a homepage component

Let's now our website homepage. It will a header for our website, as well as our 2 product options.
Let's now use the following command to create a homepage component: `ng generate component homepage`.

###Adding props

In order to display our app title to our website, let's create a prop that will allow us to pass our app title to the homepage.

To do so, add the following to the `homepage.component.ts` file:

```ts
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  }
```

The `@Input` decorator we added allow us to declare *input properties*. This means that the component can now receive its value directly from its parent component.

### Show the homepage view
In order to display the homepage view, add the following line to the component:

```ts
<app-homepage [title]="title" [subtitle]="subtitle"></app-homepage>

```
## Create a header component

## Display products: introducing directives
Now that we have a cool header and some nice products to display, it's time to display them on our website! Let's do it in a separate component that will improve reusability.

In your terminal, create the product-display component by typing the following Angular CLI command: `ng generate component products`.

Now that we have our component, let's first import the products that we need. Angular allows us to do so easily. Simply add the following lines in `product-display-component.ts`:

```ts
import { PRODUCTS } from '../mock-products';
```

And then define the attributes in the component class with the following lines:

```ts
export class ProductsDisplayComponent implements OnInit {

  products = PRODUCTS;
}
```

Now let's create a product component where we will display informations regarding our product. Once again, let's use the command `ng generate component product`.

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

Let's look at what we just created: first, an input property product which binds to the Product object we created in core, and secondly a imageUrl property which we will use to display our product's image. With the line `this.imageUrl = this.product?.imageUrls[0] ?? '';` we then assign to imageUrl the value of the first image in the imageUrls array if it exists, and do so within the ngOnInit method.

ngOnInit is an Angular lifecycle method that gets called after component initialization. Since the component is initialized, the input props, in our case the product prop, is populated and we can access it. This is what allows us to populate the property.

Now that our component properties are defined, we can add them to our html (`product.component.html`):

```html
TODO add final product componnt templating
```

Notice the `*ngFor` directive we are using. It allows us to modify the DOM structure by - you guessed it - looping over the elements of the `products` list and creating the specified html node for it (in our case, the TODO html node). 

In a general way, [directives] are defined in [Angular's official documentation](https://angular.io/guide/built-in-
                                       directives#built-in-structural-directives) as "classes that add additional behavior to elements". In that sense, components are also directives, because they define additional behavior to a standard html template.

### Create a product page: introducing angular routing

Open `app-routing.module.ts` and insert the following into routes

```ts
const routes: Routes = [
  {path: "**", component: HomepageComponent},
];
```

We can now add a dynamic roue.

```ts
const routes: Routes = [
  {path: "product/:id", component: ProductPageComponent},
  {path: "**", component: HomepageComponent},
];
```
It's important to add the wildcard route last, otherwise t will override the other routes.

In `app.component.html`, `<router-outlet></router-outlet>` will display the component related to the route. So in your browser, you can now go to `http://localhost:4200/` and it will point to our homepage!

## Create product page component
### Discovering services

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

We have done 4 things here: first, we replaced the value of products with an empty arrya, secondly, we injected the productService in our constructor. Then we defined a getProducts method in our component that handles the products logic. Lastly, we called that method in the ngOnInit lfecycle method.

Now for our product page, we will need data about a single product, let's add a `getProduct` method to our product service to fetch this data:

```ts
// product.service.ts

getProduct(id: number): Observable<Product | undefined> {
   const product = PRODUCTS.find(product => product.id === id);
   return of(product);
  }
```
TODO talk about rxjs ??
### install/add Snipcart product details
- usual
- size[product options with price variant]
- flavors[product options with price variant]
- Snipcart crawler?

## Conclusion
I very much liked Angular modular architecture
