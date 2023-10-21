import { Component } from '@angular/core';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent {

  nome: string;
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[];
  message: string | null;

  constructor(
    private service: ServicoPrestadoService
  ){
    this.meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  }

  consultar(){
    this.service.buscar(this.nome, this.mes)
      .subscribe(response => {
        this.lista = response;
        if (this.lista.length <= 0){
          this.message = "Nenhum registtro encontrado"
        } else {
          this.message = null;
        }
      })
  }

}
