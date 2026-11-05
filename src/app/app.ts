import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { Pizza } from './services/pizza';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = '4VPizza';

  constructor(
    private pizzaService: Pizza,
    private router: Router
  ) {}

  filtrarPorIngrediente(ingrediente: string) {
    this.pizzaService.setFiltro(ingrediente);
    this.router.navigate(['/listado'], {
      queryParams: { filtro: ingrediente || null }
    });
  }
}