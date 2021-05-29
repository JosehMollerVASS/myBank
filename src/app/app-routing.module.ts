import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'inicio/:user',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'movimiento',
    loadChildren: () => import('./pages/movimiento/movimiento.module').then( m => m.MovimientoPageModule)
  },
  {
    path: 'movimiento/:data',
    loadChildren: () => import('./pages/movimiento/movimiento.module').then( m => m.MovimientoPageModule)
  },
  {
    path: 'clima',
    loadChildren: () => import('./pages/clima/clima.module').then( m => m.ClimaPageModule)
  },
  {
    path: 'transferencia',
    loadChildren: () => import('./pages/transferencia/transferencia.module').then( m => m.TransferenciaPageModule)
  },
  {
    path: 'transferencia/:data/:valor/:user',
    loadChildren: () => import('./pages/transferencia/transferencia.module').then( m => m.TransferenciaPageModule)
  },
  {
    path: 'exito',
    loadChildren: () => import('./pages/exito/exito.module').then( m => m.ExitoPageModule)
  },
  {
    path: 'exito/:user',
    loadChildren: () => import('./pages/exito/exito.module').then( m => m.ExitoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
