import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductsService } from "./product.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit{

  pageTitle:string='Product Detail';
  product:IProduct | undefined;
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router:Router,
    private productsService: ProductsService)
  {

  }

  ngOnInit(): void {
    const id=Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle+=`: ${id}`;
    if(id)
    {
      this.getProduct(id);
    }
  }

  getProduct(id:number):void
  {
    this.productsService.getProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack():void
  {
    this.router.navigate(['/products']);
  }

}
