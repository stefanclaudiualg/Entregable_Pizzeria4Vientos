import { PizzaModel } from './PizzaModel';

export class PedidoItemModel {
    pizza: PizzaModel;
    cantidad: number;

    constructor(pizza: PizzaModel, cantidad: number) {
        this.pizza = pizza;
        this.cantidad = cantidad;
    }

    get subtotal(): number {
        return this.pizza.precio * this.cantidad;
    }
}