import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pizza } from '../services/pizza';
import { PizzaModel } from '../models/PizzaModel';
import { PedidoItemModel } from '../models/PedidoItemModel';

@Component({
  selector: 'app-order-form',
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.html',
  styleUrl: './order-form.scss'
})
export class OrderForm implements OnInit {
  listaPedido: PedidoItemModel[] = [];
  listaPizzasDisponibles: PizzaModel[] = [];

  // Control para desplegar con el botón '+'
  mostrarDesplegablePizza = false;

  // Formulario reactivo para seleccionar pizza y cantidad
  selectorPizzaForm = new FormGroup({
    pizzaNombre: new FormControl('', [Validators.required]),
    cantidad: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  // Formulario reactivo principal de entrega y pago
  pedidoForm = new FormGroup({
    horaEntrega: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    metodoPago: new FormControl('', [Validators.required]),
    numeroTarjeta: new FormControl({ value: '', disabled: true }),
    numeroTelefono: new FormControl({ value: '', disabled: true })
  });

  constructor(
    private pizzaService: Pizza,
    private router: Router
  ) {}

  ngOnInit() {
    this.recargarDatos();
  }

  recargarDatos() {
    this.listaPedido = this.pizzaService.obtenerPedido();
    this.listaPizzasDisponibles = this.pizzaService.getPizzas();
  }

  get horaEntrega() { return this.pedidoForm.get('horaEntrega'); }
  get direccion() { return this.pedidoForm.get('direccion'); }
  get metodoPago() { return this.pedidoForm.get('metodoPago'); }
  get numeroTarjeta() { return this.pedidoForm.get('numeroTarjeta'); }
  get numeroTelefono() { return this.pedidoForm.get('numeroTelefono'); }

  get totalPedido(): number {
    return this.pizzaService.calcularTotal();
  }

  toggleDesplegablePizza() {
    this.mostrarDesplegablePizza = !this.mostrarDesplegablePizza;
  }

  anadirPizzaDesdeDesplegable() {
    if (this.selectorPizzaForm.invalid) return;

    const nombre = this.selectorPizzaForm.value.pizzaNombre;
    const cant = Number(this.selectorPizzaForm.value.cantidad) || 1;
    const pizzaEncontrada = this.listaPizzasDisponibles.find(p => p.nombre === nombre);

    if (pizzaEncontrada) {
      this.pizzaService.anadirAlPedido(pizzaEncontrada, cant);
      this.selectorPizzaForm.reset({ pizzaNombre: '', cantidad: 1 });
      this.mostrarDesplegablePizza = false;
      this.recargarDatos();
    }
  }

  eliminarItem(item: PedidoItemModel) {
    this.pizzaService.eliminarDelPedido(item.pizza.nombre);
    this.recargarDatos();
  }

  incrementarCantidad(item: PedidoItemModel) {
    this.pizzaService.cambiarCantidad(item.pizza.nombre, item.cantidad + 1);
    this.recargarDatos();
  }

  decrementarCantidad(item: PedidoItemModel) {
    this.pizzaService.cambiarCantidad(item.pizza.nombre, item.cantidad - 1);
    this.recargarDatos();
  }

  cambiarMetodoPago(metodo: string) {
    const tarjetaCtrl = this.pedidoForm.get('numeroTarjeta');
    const telefonoCtrl = this.pedidoForm.get('numeroTelefono');

    if (metodo === 'tarjeta') {
      tarjetaCtrl?.enable();
      tarjetaCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      telefonoCtrl?.reset('');
      telefonoCtrl?.clearValidators();
      telefonoCtrl?.disable();
    } else if (metodo === 'bizum') {
      telefonoCtrl?.enable();
      telefonoCtrl?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      tarjetaCtrl?.reset('');
      tarjetaCtrl?.clearValidators();
      tarjetaCtrl?.disable();
    }

    tarjetaCtrl?.updateValueAndValidity();
    telefonoCtrl?.updateValueAndValidity();
  }

  volverAListado() {
    this.router.navigate(['/listado']);
  }

  pagar() {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    if (this.listaPedido.length === 0) {
      alert('No has añadido ninguna pizza al pedido.');
      return;
    }

    alert(`¡Muchas gracias por tu pedido! Total: ${this.totalPedido.toFixed(2)} €.`);
    this.limpiar();
  }

  limpiar() {
    this.pizzaService.limpiarPedido();
    this.listaPedido = [];
    this.pedidoForm.reset();
    this.router.navigate(['/listado']);
  }
}