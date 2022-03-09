import Category from "./Category";

export default interface ProductModel {
}

export default class ProductModel2 {
    product_id: number = -1;
    title: string = '';
    content: string = '';
    image: string = '';
    categories: Array<Category> = Array<Category>();
    description: string = '';
    price: number = -1;
    quantity: number = 0;

    constructor() {

    }

    static model(product_id:any, title:any, content:any, image:any, categories:any, description:any, price:any, quantity:any) {
        let product = new ProductModel();
        product.product_id = product_id;
        product.title = title;
        product.content = content;
        product.image = image;
        product.categories = categories;
        product.description = description;
        product.price = price;
        product.quantity = quantity;
    }

    // constructor(product_id:any, title:any, content:any, image:any, categories:any, description:any, price:any, quantity:any) {
    //     this.product_id = product_id;
    //     this.title = title;
    //     this.content = content;
    //     this.image = image;
    //     this.categories = categories;
    //     this.description = description;
    //     this.price = price;
    //     this.quantity = quantity;
    // }

    // static ProductModelEmpty() {
    //     let product = new ProductModel();
    //     product.product_id = -1;
    //     product.title = '';
    //     product.content = '';
    //     product.image = '';
    //     product.categories = [];
    //     product.description = '';
    //     return product; 
    // }
}