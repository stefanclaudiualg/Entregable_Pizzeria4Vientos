export class PizzaModel {
    nombre: string;
    precio: number;
    imagen: string;
    ingredientes: string[];

    constructor(nombre: string, precio: number, imagen: string, ingredientes: string[]) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.ingredientes = ingredientes;
    }
}