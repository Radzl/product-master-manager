import { Routes } from '@angular/router';
import { ListComponent } from './componentes/main/list/list.component';
import { AddComponent } from './componentes/main/añadir/add.component';
import { EditComponent } from './edit/edit.component';


export const routes: Routes = [
    { path: 'list', component: ListComponent },  
    { path: 'add', component: AddComponent }, 
    { path: 'edit', component: EditComponent},
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', redirectTo: '/list' }  

];
