import { Injectable, signal } from '@angular/core';
import { PizzaModel } from '../models/PizzaModel';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  pizzasCompletas: PizzaModel[] = [
    new PizzaModel('Margarita', 15.50, 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_640.jpg', ['tomate', 'queso']),
    new PizzaModel('BBQ', 16.00, 'https://cdn.pixabay.com/photo/2017/08/06/06/42/pizza-2589569_640.jpg', ['tomate', 'queso', 'carne', 'cebolla', 'barbacoa']),
    new PizzaModel('Napolitana', 18.00, 'https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_640.jpg', ['tomate', 'queso', 'anchoas']),
    new PizzaModel('Vegetariana', 12.00, 'https://cdn.pixabay.com/photo/2016/11/29/13/02/cheese-1869708_640.jpg', ['tomate', 'queso', 'pimiento', 'champiñones']),
    new PizzaModel('Hawaiana', 20.50, 'https://cdn.pixabay.com/photo/2017/09/30/15/10/plate-2802332_640.jpg', ['tomate', 'queso', 'piña', 'jamon']),
    new PizzaModel('Carbonara', 21.00, 'https://cdn.pixabay.com/photo/2014/07/08/12/34/pizza-386717_640.jpg', ['tomate', 'queso', 'nata', 'champiñones', 'bacon'])
  ];

  pedido: PedidoItemModel[] = [];
  filtroIngrediente = signal<string>('');

  getPizzas(): PizzaModel[] {
    return this.pizzasCompletas;
  }

  setFiltro(ingrediente: string) {
    this.filtroIngrediente.set(ingrediente);
  }

  anadirAlPedido(pizza: PizzaModel, cantidad: number) {
    if (cantidad <= 0) return;

    const itemExistente = this.pedido.find(item => item.pizza.nombre === pizza.nombre);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      this.pedido.push(new PedidoItemModel(pizza, cantidad));
    }
  }

  obtenerPedido(): PedidoItemModel[] {
    return this.pedido;
  }

  limpiarPedido() {
    this.pedido = [];
  }
}