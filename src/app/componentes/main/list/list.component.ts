import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  showMore: boolean[] = [];
  tiposProducto: string[] = ['PC', 'Portátil', 'Tablet'];

  products: { id: number; name: string; type: string; details: string }[] = [
    { id: 1, name: 'Asus ROG STRIX G15', type: 'Portátil', details: 'Nuevo: El ASUS ROG G15 es un potente laptop gaming que pertenece a la serie Republic of Gamers (ROG) de ASUS, diseñada específicamente para jugadores y usuarios que necesitan un rendimiento de alto nivel para tareas intensivas, como juegos, edición de video y diseño gráfico.' },
    { id: 2, name: 'Acer Nitro', type: 'Portátil', details: 'Nuevo: El Acer Nitro es una serie de laptops y PCs de escritorio diseñadas específicamente para gamers y usuarios que buscan una máquina potente para tareas como juegos, edición de video y otras aplicaciones gráficas intensivas. Acer ha desarrollado esta serie con un enfoque en ofrecer un buen rendimiento a un precio competitivo, lo que la convierte en una opción popular para los gamers que no necesariamente quieren gastar tanto como en modelos de gama alta.' },
    { id: 3, name: 'Lenovo IdeaPad 3', type: 'Portátil', details: 'Seminuevo: El Lenovo IdeaPad 3 es una serie de laptops diseñadas para ofrecer un rendimiento equilibrado a un precio asequible. Es una opción popular para usuarios que buscan una computadora portátil económica para tareas cotidianas como navegar por internet, ver videos, trabajar en documentos y realizar tareas escolares o de oficina.' }
  ];
  
  product: { id: number; name: string; type: string; details: string } = { id: 0, name: '', type: '', details: '' };
  editingIndex: number | null = null;

  ngOnInit(): void {
    this.showMore = new Array(this.products.length).fill(false);  
  }

  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.showMore = new Array(this.products.length).fill(false);
  }

  toggleShowMore(index: number) {
    this.showMore[index] = !this.showMore[index];
  }

  loadProductForEdit(index: number) {
    const productToEdit = this.products[index];
    this.product = { ...productToEdit };
    this.editingIndex = index;
  }

  saveProduct() {
    if (this.editingIndex !== null) {
      this.products[this.editingIndex] = { ...this.product };
    } else {
      this.products.push(this.product);
    }

    this.product = { id: 0, name: '', type: '', details: '' };
    this.editingIndex = null;
    this.showMore = new Array(this.products.length).fill(false); 
  }
}
