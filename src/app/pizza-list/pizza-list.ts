import { Component, effect, input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaModel } from '../models/PizzaModel';
import { Pizza } from '../services/pizza';

@Component({
  selector: 'app-pizza-list',
  imports: [],
  templateUrl: './pizza-list.html',
  styleUrl: './pizza-list.scss'
})
export class PizzaList implements OnInit, OnChanges {
  // Input enlazado directamente a los queryParams del Router
  filtro = input<string>('');

  listaCompleta: PizzaModel[] = [];
  listaFiltrada = signal<PizzaModel[]>([]);
  mensajeNotificacion = signal<string>('');
  private timeoutId: any;

  constructor(
    private pizzaService: Pizza,
    private router: Router
  ) {
    this.listaCompleta = this.pizzaService.getPizzas();
    this.listaFiltrada.set([...this.listaCompleta]);

    effect(() => {
      const texto = this.filtro() || this.pizzaService.filtroIngrediente();
      this.aplicarFiltro(texto);
    });
  }

  ngOnInit() {
    this.listaCompleta = this.pizzaService.getPizzas();
    const textoInicial = this.filtro() || this.pizzaService.filtroIngrediente();
    this.aplicarFiltro(textoInicial);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filtro']) {
      this.aplicarFiltro(this.filtro());
    }
  }

  get totalItemsPedido(): number {
    return this.pizzaService.obtenerPedido().reduce((sum, item) => sum + item.cantidad, 0);
  }

  aplicarFiltro(ingrediente: string) {
    if (!this.listaCompleta.length) {
      this.listaCompleta = this.pizzaService.getPizzas();
    }

    const term = (ingrediente || '').trim().toLowerCase();
    if (term === '') {
      this.listaFiltrada.set([...this.listaCompleta]);
    } else {
      const filtradas = this.listaCompleta.filter(p =>
        p.ingredientes.some(ing => ing.toLowerCase().includes(term)) ||
        p.nombre.toLowerCase().includes(term)
      );
      this.listaFiltrada.set(filtradas);
    }
  }

  agregarPizzaAlPedido(pizza: PizzaModel, cantidadValor: string) {
    const cant = Number(cantidadValor) || 1;
    if (cant <= 0) return;

    this.pizzaService.anadirAlPedido(pizza, cant);
    this.mensajeNotificacion.set(`¡Añadido al pedido: ${cant}x ${pizza.nombre}!`);

    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.mensajeNotificacion.set(''), 3500);
  }

  cerrarNotificacion() {
    this.mensajeNotificacion.set('');
  }

  irAlPedido() {
    this.router.navigate(['/pedido']);
  }
}