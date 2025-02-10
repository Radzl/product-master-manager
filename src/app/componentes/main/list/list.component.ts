import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../product.service'; // Ajusta la ruta según tu estructura
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class ListComponent implements OnInit {
  products: Product[] = [];
  showMore: boolean[] = [];
  tiposProducto: string[] = ['PC', 'Portátil', 'Tablet'];
  // Para saber si se está editando (guardamos el índice o el id)
  editingIndex: number | null = null;

  // Formulario reactivo para el producto
  productForm!: FormGroup;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  // Inicializa el formulario reactivo con validadores (puedes agregar más si lo requieres)
  initializeForm(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      details: new FormControl('', Validators.required)
    });
  }

  // Carga la lista de productos desde la API
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.showMore = new Array(this.products.length).fill(false);
      },
      (error) => console.error('Error al cargar productos:', error)
    );
  }

  // Alterna la visualización de detalles completos o resumidos
  toggleShowMore(index: number): void {
    this.showMore[index] = !this.showMore[index];
  }

  // Prepara el formulario para editar un producto existente
  loadProductForEdit(index: number): void {
    this.editingIndex = index;
    const product = this.products[index];
    // Rellenamos el formulario con los datos del producto
    this.productForm.patchValue({
      name: product.name,
      type: product.type,
      details: product.details
    });
  }

  // Guarda el producto: crea uno nuevo o actualiza uno existente
  saveProduct(): void {
    const formValue = this.productForm.value;

    if (this.editingIndex !== null) {
      // Actualizar producto
      const productId = this.products[this.editingIndex].id;
      if (productId !== undefined) {
        const productToUpdate: Product = {
          id: productId,
          name: formValue.name,
          type: formValue.type,
          details: formValue.details
        };

        this.productService.editProduct(productId, productToUpdate).subscribe(
          (response) => {
            console.log('Producto actualizado:', response);
            this.resetForm();
            this.loadProducts(); // Recarga la lista actualizada
          },
          (error) => console.error('Error al actualizar producto:', error)
        );
      }
    } else {
      // Crear nuevo producto
      const newProduct: Product = {
        name: formValue.name,
        type: formValue.type,
        details: formValue.details
      };

      this.productService.addProduct(newProduct).subscribe(
        (response) => {
          console.log('Producto agregado:', response);
          this.resetForm();
          this.loadProducts(); // Recarga la lista con el nuevo producto
        },
        (error) => console.error('Error al agregar producto:', error)
      );
    }
  }

  // Elimina un producto mediante la API
  deleteProduct(index: number): void {
    const productId = this.products[index].id;
    if (productId !== undefined) {
      this.productService.deleteProduct(productId).subscribe(
        (response) => {
          console.log('Producto eliminado:', response);
          this.loadProducts(); // Recarga la lista después de eliminar
        },
        (error) => console.error('Error al eliminar producto:', error)
      );
    }
  }

  // Reinicia el formulario y el modo de edición
  resetForm(): void {
    this.productForm.reset();
    this.editingIndex = null;
  }
}
