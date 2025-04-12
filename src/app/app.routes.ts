import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TransactionComponent } from './transaction/transaction.component';
export const routes: Routes = [
    { path: 'login' , component: LoginComponent},
    { path : '' , component: HomeComponent },
    { path : 'transaction' , component: TransactionComponent }
];
