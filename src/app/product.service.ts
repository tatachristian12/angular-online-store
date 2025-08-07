import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private apiUrl: string = "https://api.escuelajs.co/api/v1/products";

  constructor(private http:  HttpClient){

  }

  //This method is used in the constructor of the productlist ts file to make the get request to the API endpoint
  getProduct(): Observable<any>{
    return this.http.get(`${this.apiUrl}`)
  }

  //method used in the productdetails ts file to create the method used to view product by id 
  getProductById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
      }
  
  // 
  createProduct(product: any): Observable<any>{
    return this.http.post(`${this.apiUrl}`, product);
  }

  deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
      }

  getCategories(): Observable<any> {
  return this.http.get('https://api.escuelajs.co/api/v1/categories');
}

updateProduct(id: number, product: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, product);
}

}
