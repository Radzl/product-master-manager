import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;  // Opcional al crear uno nuevo
  name: string;
  type: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Cambia la URL según la ubicación de tu API
  private apiUrl = 'http://localhost/API/products.php';

  constructor(private http: HttpClient) {}

  // Obtiene todos los productos (GET)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Agrega un producto (POST)
  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // Edita un producto (PUT). Se envía el id en la URL.
  editProduct(id: number, product: Product): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, product);
  }

  // Elimina un producto (DELETE)
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }
}
