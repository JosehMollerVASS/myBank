import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.page.html',
  styleUrls: ['./movimiento.page.scss'],
})
export class MovimientoPage implements OnInit {
movimiento;
  constructor(private activateRoute: ActivatedRoute) {

    let data = this.activateRoute.snapshot.paramMap.get('data');
    this.movimiento = JSON.parse(data);
    
    console.log(this.movimiento);
  }

  ngOnInit() {
  }

}
