import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { UsersComponent } from "./components/users/users.component";
import { UserComponent } from "./components/users/user/user.component";
import { EditUserComponent } from "./components/users/edit-user/edit-user.component";
import { ProductComponent } from "./components/products/product/product.component";
import { EditProductComponent } from "./components/products/edit-product/edit-product.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";


const appRoutes : Routes = [
    {
        path : '',
        component : HomeComponent,
        title : 'Dashboard'
    },
    {
        path : 'products',
        component : ProductsComponent,
        title : 'Products',
        children : [
            {
                path : 'addProduct',
                component : EditProductComponent
            },
            {
                path : ':prodId',
                component : ProductComponent
            },
            {
                path : ':prodId/edit',
                component : EditProductComponent
            }
        ]
    },
    
    {
        path : 'users',
        component : UsersComponent,
        title : 'Users',
        children : [
            {
                path : 'addUser',
                component : EditUserComponent
            },
            {
                path : ':userId',
                component : UserComponent
            },
            {
                path : ':userId/edit',
                component : EditUserComponent
            }
        ]
    },
    {
        path : 'page-not-found',
        component : PageNotFoundComponent
    },
    {
        path : '**',
        redirectTo : 'page-not-found'
    }
]
@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule {

}