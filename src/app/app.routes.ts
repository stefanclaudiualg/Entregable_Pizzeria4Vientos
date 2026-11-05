import { Routes } from '@angular/router';
import { PizzaList } from './pizza-list/pizza-list';
import { OrderForm } from './order-form/order-form';

export const routes: Routes = [
    { path: '', redirectTo: 'listado', pathMatch: 'full' },
    { path: 'listado', component: PizzaList },
    { path: 'pedido', component: OrderForm }
];