import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';

import { InicioPage } from './inicio.page';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { TarjetaPipe } from 'src/app/pipes/tarjeta.pipe';


@NgModule({
  imports: [
    CommonModule,    
    IonicModule,
    InicioPageRoutingModule
  ],
  declarations: [InicioPage, FechaPipe, TarjetaPipe]
})
export class InicioPageModule {}
