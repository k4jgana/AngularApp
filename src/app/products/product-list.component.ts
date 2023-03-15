import { style } from "@angular/animations";
import { Component,OnDestroy,OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductsService } from "./product.service";

@Component({
    templateUrl:"./product-list.component.html",
    styleUrls:['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy
{

    pageTitle:string='Product List';
    imageWidth:number=50;
    imageMargin:number=2;
    errorMessage:string='';
    showImage:boolean=true;
    private _ListFilter:string='';
    sub!: Subscription;
    get listFilter():string
    {
      return this._ListFilter;
    }
    set listFilter(value:string){
      this._ListFilter=value;
      console.log("in setter:",value)
      this.filteredProducts=this.performFilter(value);
    }

    filteredProducts:IProduct[]=[];
    products:IProduct[]=[];


    constructor(private productService:ProductsService)
    {

    }

    performFilter(filterBy:string):IProduct[]
    {
      filterBy=filterBy.toLocaleLowerCase();
      return this.products.filter((product:IProduct)=>
      product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage() :void
    {
        this.showImage=!this.showImage
    }

    ngOnInit(): void {
      this.sub=this.productService.getProducts().subscribe({
        next:products=>{this.products=products;
          this.filteredProducts=this.products;},
        error:err=>this.errorMessage=err
      });
      
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
    onRatingClicked(message:string):void
    {
      this.pageTitle='Product List: ' +message;
    }

}