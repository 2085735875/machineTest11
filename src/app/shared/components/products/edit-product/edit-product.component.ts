import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UuidService } from 'src/app/shared/services/uuid.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  prodId !: string;
  prodObj !: Iproduct;
  prodForm !: FormGroup;
  isinEditMode : boolean = false
  isinEditMode2 : boolean = false
  constructor(
    private _route : ActivatedRoute,
    private _productService : ProductsService,
    private _router : Router,
    private _uuidService : UuidService
  ) { }

  ngOnInit(): void {
    this.createProdForm()
    this.prodId = this._route.snapshot.params['prodId'];
    if(this.prodId){
      this.isinEditMode = true
      this.prodObj = this._productService.fetchProduct(this.prodId)
      this.prodForm.patchValue(this.prodObj)
  
      this._route.queryParams
          .subscribe(res => {
            if(res['canEdit'] == 0){
              this.prodForm.disable();
              this.isinEditMode2 = false
            }else{
              this.prodForm.enable();
              this.isinEditMode2 = true
            }
          })
    }else{
      this.isinEditMode = false
    }
  
  }

  createProdForm(){
    this.prodForm = new FormGroup({
      pname : new FormControl(null, [Validators.required]),
      pstatus : new FormControl(null, [Validators.required])
    })
  }

  onProductUpdate(){
    if(this.prodForm.valid){
      let updatedObj : Iproduct = {...this.prodForm.value, pid : this.prodId}; 
      this._productService.updateProduct(updatedObj)
      this._router.navigate(['/products'])
    }
  }

  onProductAdd(){
    if(this.prodForm.valid){
      let product : Iproduct = {...this.prodForm.value, pid : this._uuidService.uuid() };
      this._productService.addProduct(product);
      this.prodForm.reset();
      this._router.navigate(['/products'])
    }
  }

}
