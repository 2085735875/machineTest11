import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  prodId !: string;
  prodObj !: Iproduct;
  constructor(
    private _productService : ProductsService,
    private _route : ActivatedRoute,
    private _router : Router
  ) { }

  ngOnInit(): void {
    // this.prodId = this._route.snapshot.params['prodId'];
    // this.prodObj = this._productService.fetchProduct(this.prodId)

    this._route.params
        .subscribe(res => {
          this.prodId = res['prodId'];
          this.prodObj = this._productService.fetchProduct(this.prodId)
        })
  }

  onRemoveProduct(){
    this._productService.removeProduct(this.prodId);
    this._router.navigate(['/products'])
  }

}
