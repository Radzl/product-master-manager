import { Component } from '@angular/core';
import { ProductService } from '../../../services/digimon.service';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']  
})
export class AddComponent {
Number(arg0: string): number {
throw new Error('Method not implemented.');
}
  constructor(private productService: ProductService){}
  
  addProduct(id: number, name: string, type: string){  
    this.productService.addProduct({id, name, type}); 
  }
}
