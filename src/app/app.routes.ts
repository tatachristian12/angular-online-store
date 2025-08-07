import { Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { AddproductComponent } from './addproduct/addproduct.component';


export const routes: Routes = [
     {path:'', redirectTo: 'home', pathMatch: 'full'},
    {path:'home', component:  ProductlistComponent},
    {path:'productdetails/:id', component: ProductdetailsComponent},
    {path:'addproduct', component:  AddproductComponent},
];
