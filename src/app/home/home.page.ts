import { Component } from '@angular/core';
import { ConeccionService } from '../services/coneccion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  filterPost: any = '';
  Nombre: any;
  Apellido: any;
  Correo: any;
  Cedula: any;
  Usuario_Githup: any;
  Fechas: any;
  cabezera: boolean = false;
  checkbox: boolean = false;
  datos: any = {};
  repositiorios: any[] = []
  dF: any[] = [];
  p: number = 1;
  movil: any = false

  constructor(private conneccion: ConeccionService) {
  }
  ngOnInit(): void {

    this.movil = true
    this.cargarLocalStorage()
    if (localStorage.getItem('Nombre')) {
      this.desaparecer();
      this.conneccion.getRepos(localStorage.getItem('Usuario_Githup')).subscribe(data => {
        this.cabezera = true;
        this.repositiorios = data;
      });

    }
  }



 
  guardarStorage() {
    if (this.Fechas == undefined || this.Nombre == undefined || this.Apellido == undefined || this.Correo == undefined || this.Cedula == undefined || this.Usuario_Githup == undefined) {
      alert("Faltan Campos por llenar ")
    } else {
      localStorage.setItem('Nombre', JSON.stringify(this.Nombre).replace(/['"]+/g, ''));
      localStorage.setItem('Apellido', JSON.stringify(this.Apellido).replace(/['"]+/g, ''));
      localStorage.setItem('Correo', JSON.stringify(this.Correo).replace(/['"]+/g, ''));
      localStorage.setItem('Cedula', JSON.stringify(this.Cedula).replace(/['"]+/g, ''));
      localStorage.setItem('Usuario_Githup', JSON.stringify(this.Usuario_Githup).replace(/['"]+/g, ''));
      localStorage.setItem('Fechas', JSON.stringify(this.Fechas).replace(/['"]+/g, ''));
      this.cargarLocalStorage()
      this.conneccion.getRepos(this.Usuario_Githup).subscribe(data => {

        this.repositiorios = data;
        this.desaparecer();
        this.conneccion.getRepos(this.datos.Usuario_Githup).subscribe(data => {
          this.cabezera = true;
          console.log(this.datos);


          this.repositiorios = data;
        });
      });

    }

  }
  cargarLocalStorage() {
    this.datos = {
      'Fechas': localStorage.getItem('Fechas'),
      'Apellido': localStorage.getItem('Apellido'),
      'Cedula': localStorage.getItem('Cedula'),
      'Correo': localStorage.getItem('Correo'),
      'Nombre': localStorage.getItem('Nombre'),
      'Usuario_Githup': localStorage.getItem('Usuario_Githup')


    }
    console.log(this.datos);


  }


  desaparecer() {
    let formulario = document.getElementById("d_input");
    let titulo = document.getElementById("titulo");
    let caja = document.getElementById("caja");
    let Ti = document.getElementById("Ti");
    let perfil = document.getElementById("perfil");
    let animaT = document.getElementById("animaT");
    let contenedorRepo = document.getElementById("contenedorRepo");
    formulario.classList.toggle("desapareser");
    setTimeout(() => {
      titulo.classList.add('noneB')
      caja.classList.add('noneB')
      Ti.classList.add('none')
      formulario.classList.toggle("none");
      setTimeout(() => {
        titulo.classList.toggle("desapareserTitulo");
        setTimeout(() => {
          titulo.classList.add('none')
          caja.classList.add('caja')
          setTimeout(() => {
            caja.classList.add('topF')
            setTimeout(() => {
              caja.classList.add('bF')
              perfil.classList.add('blok')
              setTimeout(() => {
                animaT.classList.add('anim');
                contenedorRepo.classList.add('anim');
              }, 300);
            }, 500);
          }, 200);
        }, 300);
      }, 300);
    }, 300);
  }
}
