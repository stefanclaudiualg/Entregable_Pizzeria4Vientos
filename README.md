# Pizzería 4 Vientos

Proyecto de Angular para la gestión de catálogo de pizzas y pedidos a domicilio.

---

## 1. Átomos (styles.scss)

La tipografía y los colores de la aplicación están definidos como átomos en `src/styles.scss`:

- **Colores personalizables en `styles.scss`**:
  ```scss
  $color-primary: #d93829;       // Color principal (botones y títulos)
  $color-secondary: #6c757d;     // Color secundario
  $color-dark: #212529;          // Fondos oscuros y texto
  $color-light: #f8f9fa;         // Fondo de la web
  ```
- **Tipografía**: Fuentes *Montserrat* (títulos/botones) y *Nunito* (textos).

---

## 2. Servicios con Input / Output

Se prioriza la comunicación entre componentes mediante `Input` y `Output`:

- El **Navbar** emite el texto buscado mediante `output<string>()`.
- El componente **App** recibe el evento y pasa el filtro por URL.
- **PizzaList** recibe el parámetro con `input<string>()` gracias a `withComponentInputBinding()`.
- El servicio `Pizza` se usa únicamente para almacenar los datos (catálogo y carrito).

---

## 3. Formularios Reactivos y Router

- **Uso de Router**:
  Navegación programática con `this.router.navigate(['/listado'])` y `this.router.navigate(['/pedido'])`.
- **Formularios Reactivos**:
  Uso de `FormGroup`, `FormControl` y `Validators` en el pedido (hora de entrega, dirección y validación según método de pago: 16 dígitos para tarjeta o 9 para Bizum).
- **Botón `+` con desplegable**:
  Dentro del formulario de pedido hay un botón `+ Añadir pizza` que abre un desplegable (`<select>`) con las pizzas y un campo numérico para la cantidad.
