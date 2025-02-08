import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/digimon.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  
  products: {id: number,name: string, type: string}[] = []; 

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    

  }
  

updateProduct(arg0: string,arg1: string) {

}


}
