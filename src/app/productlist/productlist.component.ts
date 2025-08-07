import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productlist',
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css',
})
export class ProductlistComponent {
  products: any[] = []; //holds all products fetched from the API
  categories: any[] = []; //Holds product categories retrieved from the API.
  isEditing = false;
  filteredProducts: any[] = []; // holds only the filtered products based on the search term
  searchTerm: string = ''; //stores the text typed by the user into the search box.



  private productService = inject(ProductService); 
  private router = inject(Router);

  // When adding or editing a product, this object holds the form data.
  productObject: any = {
    title: '',
    price: '',
    description: '',
    categoryId: this.categories.length ? this.categories[0].id :null,
    images: ['']
  };

  //runs when the component loads
  constructor() {
    this.loadCategories(); //fetches categories.
    this.loadProducts(); //fetches the list of products.
  }

  // Calls your service’s getProduct() method to get the products from the API.
  loadProducts() {
    this.productService.getProduct().subscribe((result: any) => {
      this.products = result; //stores all products.
      this.filteredProducts = [...this.products]; 
    });
  }

  //Calls the getCategories() method from your ProductService and fetches the product categories from the API to be used in the dropdown
  loadCategories() {
  this.productService.getCategories().subscribe(result => {
    this.categories = result

    // Only set default category if categoryId is null or undefined
    if ( this.categories.length > 0) {
      this.productObject.categoryId = this.categories[0].id;
    }
  });
}

//Navigates to a product detail page
  goToDetails(productId: number) {
    this.router.navigate(['/productdetails', productId]);
  }

  //Calls the API’s delete method to delete a product 
  onDeleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== productId);
        alert('Product deleted successfully!');
      },
      error: err => console.error('Error deleting product:', err)
    });
  }

onEdit(product: any): void {
  this.isEditing = true;

  this.productObject = {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    images: [...(product.images || [''])],
    categoryId: Number(product.category?.id || product.categoryId || this.categories[0]?.id)
  };
}

  resetForm(): void {
    this.productObject = {
      title: '',
      price: '',
      description: '',
      categoryId: this.categories.length ? this.categories[0].id : null,
      images: ['']
    };
    this.isEditing = false;
  }

// Method to submit the form 
 onSave(): void {
  const productToSave = {
    ...this.productObject,
    price: Number(this.productObject.price),
    images: this.productObject.images
  };

  if (productToSave.id) {
    // UPDATE (PUT)
    this.productService.updateProduct(productToSave.id, productToSave).subscribe({
      next: (updated) => {
        const index = this.products.findIndex(p => p.id === updated.id);
        if (index !== -1) {
          this.products[index] = updated;
        }
        alert('Product updated successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Update failed:', err),
    });
  } else {
    // CREATE (POST)
    this.productService.createProduct(productToSave).subscribe({
      next: (response) => {
        alert('Product added successfully!');
        this.products.push(response);
        this.resetForm();
      },
      error: (error) => console.error('Create failed:', error),
    });
  }
}



   searchProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(term)
    );
  }

}

