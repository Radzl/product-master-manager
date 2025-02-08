import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  private storageKey = 'products';


  constructor() {
  
      if (this.isLocalStorageAvailable()) {
        const savedProducts = localStorage.getItem(this.storageKey);
        if (savedProducts) {
          this.products = JSON.parse(savedProducts);
        }
      }
  }

  products = [
    {id:0 ,name: 'Asus', type: 'ROG G15'},
    {id:1 ,name: 'Acer', type: 'Aspire 3'},
    {id:2 ,name: 'Lenovo', type: 'Ideapad 3'}
  ];

  getProducts(){
    return this.products;
  }

  addProduct(product :{id: number, name: string, type: string})
  {
    this.products.push(product);

    this.saveToLocalStorage();   
  }

  deleteProduct(index: number){
    this.products.splice(index, 1);

     this.saveToLocalStorage();  
  }

  editProduct(index: number, updatedProduct: {id: number, name: string, type: string}) {
    this.products[index] = updatedProduct; 
    this.saveToLocalStorage(); 
  }


  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.products)); 
  }


  private isLocalStorageAvailable(): boolean {
    try {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    } catch (e) {
      return false;
    }
  }
}
