import { Injectable, signal } from '@angular/core';
import { PizzaModel } from '../models/PizzaModel';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Injectable({
  providedIn: 'root'
})
export class Pizza {
  pizzasCompletas: PizzaModel[] = [
    new PizzaModel('Margarita', 15.50, 'pizzas/margarita.jpg', ['tomate', 'queso']),
    new PizzaModel('BBQ', 16.00, 'pizzas/barbacoa.webp', ['tomate', 'queso', 'carne', 'cebolla', 'barbacoa']),
    new PizzaModel('Romana', 16.50, 'pizzas/romana.jpg', ['tomate', 'queso', 'anchoas', 'alcaparras', 'oregano']),
    new PizzaModel('Siciliana', 17.00, 'pizzas/Siciliana.jpg', ['tomate', 'queso', 'olivas negras', 'alcaparras', 'albahaca']),
    new PizzaModel('Napolitana', 18.00, 'pizzas/Napolitana.jpg', ['tomate', 'queso', 'anchoas']),
    new PizzaModel('Vegetariana', 12.00, 'pizzas/Vegetariana.jpg', ['tomate', 'queso', 'pimiento', 'champiñones']),
    new PizzaModel('Hawaiana', 20.50, 'pizzas/Hawaiana.jpg', ['tomate', 'queso', 'piña', 'jamon']),
    new PizzaModel('Carbonara', 21.00, 'pizzas/Carbonara.jpg', ['tomate', 'queso', 'nata', 'champiñones', 'bacon']),
    new PizzaModel('Cuatro Quesos', 17.50, 'pizzas/Cuatro Quesos.jpg', ['tomate', 'mozzarella', 'gorgonzola', 'parmesano', 'cheddar']),
    new PizzaModel('Pepperoni', 16.50, 'pizzas/barbacoa.webp', ['tomate', 'queso', 'pepperoni']),
    new PizzaModel('Diavola', 17.00, 'pizzas/barbacoa.webp', ['tomate', 'queso', 'salami picante', 'guindilla']),
    new PizzaModel('Prosciutto e Funghi', 16.00, 'pizzas/Carbonara.jpg', ['tomate', 'queso', 'jamon', 'champiñones']),
    new PizzaModel('Marinera', 19.00, 'pizzas/Napolitana.jpg', ['tomate', 'queso', 'atun', 'gambas', 'mejillones']),
    new PizzaModel('Calzone Tradicional', 16.50, 'pizzas/Siciliana.jpg', ['tomate', 'queso', 'jamon', 'ricotta', 'albahaca']),
    new PizzaModel('Pollo Grill', 15.00, 'pizzas/Vegetariana.jpg', ['tomate', 'queso', 'pollo', 'pimiento', 'maiz']),
    new PizzaModel('Caprichosa', 17.50, 'pizzas/Siciliana.jpg', ['tomate', 'queso', 'jamon', 'alcachofas', 'olivas']),
    new PizzaModel('Trufa y Boletus', 22.00, 'pizzas/Carbonara.jpg', ['queso', 'boletus', 'salsa trufa', 'parmesano']),
    new PizzaModel('Tex-Mex', 18.50, 'pizzas/barbacoa.webp', ['tomate', 'queso', 'carne picada', 'jalapeños', 'cebolla']),
    new PizzaModel('Cuatro Estaciones', 17.00, 'pizzas/Vegetariana.jpg', ['tomate', 'queso', 'jamon', 'champiñones', 'olivas', 'alcachofas']),
    new PizzaModel('Rustica', 16.00, 'pizzas/Carbonara.jpg', ['tomate', 'queso', 'bacon', 'cebolla caramelizada', 'rulo de cabra']),
    new PizzaModel('Nordica', 19.50, 'pizzas/Carbonara.jpg', ['nata', 'queso', 'salmon ahumado', 'eneldo']),
    new PizzaModel('Iberica', 19.00, 'pizzas/margarita.jpg', ['tomate', 'queso', 'jamon iberico', 'rucula', 'parmesano']),
    new PizzaModel('Mediterránea', 16.50, 'pizzas/Siciliana.jpg', ['tomate', 'queso', 'atun', 'olivas negras', 'pimiento rojo']),
    new PizzaModel('Serrana', 17.50, 'pizzas/romana.jpg', ['tomate', 'queso', 'jamon serrano', 'tomate cherry', 'oregano'])
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

  eliminarDelPedido(pizzaNombre: string) {
    this.pedido = this.pedido.filter(item => item.pizza.nombre !== pizzaNombre);
  }

  cambiarCantidad(pizzaNombre: string, cantidad: number) {
    const item = this.pedido.find(i => i.pizza.nombre === pizzaNombre);
    if (item) {
      item.cantidad = cantidad;
      if (item.cantidad <= 0) {
        this.eliminarDelPedido(pizzaNombre);
      }
    }
  }

  obtenerPedido(): PedidoItemModel[] {
    return this.pedido;
  }

  calcularTotal(): number {
    return this.pedido.reduce((total, item) => total + item.subtotal, 0);
  }

  limpiarPedido() {
    this.pedido = [];
  }
}

export { Pizza as PizzaService };
