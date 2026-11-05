import { Component, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Pizza } from '../services/pizza';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  busquedaControl = new FormControl('');
  filtrarIngrediente = output<string>();

  constructor(
    private router: Router,
    private pizzaService: Pizza
  ) {}

  get totalItems(): number {
    return this.pizzaService.obtenerPedido().reduce((sum, item) => sum + item.cantidad, 0);
  }

  onBuscar() {
    this.filtrarIngrediente.emit(this.busquedaControl.value ?? '');
  }

  navegarListado() {
    this.router.navigate(['/listado']);
  }

  navegarPedido() {
    this.router.navigate(['/pedido']);
  }
}