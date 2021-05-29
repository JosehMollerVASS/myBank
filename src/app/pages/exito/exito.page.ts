import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.page.html',
  styleUrls: ['./exito.page.scss'],
})
export class ExitoPage implements OnInit {
datos;
  constructor(private router: Router, private activateRoute: ActivatedRoute) {
   this.datos = this.activateRoute.snapshot.paramMap.get('user');
   }

  ngOnInit() {
  }
  regresar(){
    this.router.navigate(['/inicio', this.datos]);
  }
}
