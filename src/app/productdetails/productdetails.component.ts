import { Component, inject } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-productdetails',
  imports: [CommonModule,RouterLink],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {
   private route = inject(ActivatedRoute);
 private productService = inject(ProductService);
 products?: any;

 constructor(){
   this.route.paramMap.subscribe(params => {
          const productId = params.get('id');
          if (productId) {
            this.productService.getProductById(+productId).subscribe(data => {
              this.products = data;
            });
          }
        });
      }
 }

