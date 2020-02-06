import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './person/person.component';

const routes: Routes = [
  {path: 'myactivator', loadChildren: (): any => import('./activator/activator.module').then(m => m.ActivatorModule)},
  {path: 'person/:id', component: PersonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
