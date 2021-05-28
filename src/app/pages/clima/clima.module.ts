import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClimaPageRoutingModule } from './clima-routing.module';

import { ClimaPage } from './clima.page';
import { ClimaIconsPipe } from 'src/app/pipes/clima-icons.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClimaPageRoutingModule
  ],
  declarations: [ClimaPage, ClimaIconsPipe]
})
export class ClimaPageModule {}
