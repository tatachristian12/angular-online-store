import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addproduct',
  imports: [FormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css',
})
export class AddproductComponent {

  productObject: any = {
    title: "",
    price: "",
    description: "",
    categoryId: "1",
    image: "",
  };

  constructor(private http: HttpClient){}

  onSave(){
    this.http.post("https://api.escuelajs.co/api/v1/products", this.productObject).subscribe(
      ()=>{
        alert("created successfully")
      }
    )
  }

}
