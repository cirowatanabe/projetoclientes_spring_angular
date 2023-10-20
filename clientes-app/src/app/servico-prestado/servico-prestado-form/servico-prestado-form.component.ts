import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/clientes/cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ServicoPrestado } from '../ServicoPrestado'
import { ServicoPrestadoService } from 'src/app/servico-prestado.service';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  success: boolean = false;
  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private service: ServicoPrestadoService
    ){
      this.servico = new ServicoPrestado();
     }

  ngOnInit(): void {
    this.clienteService.getAll()
        .subscribe(response => this.clientes = response)
  }

  onSubmit(){
    this.servico.data = "01/01/2020";

    this.service.salvar(this.servico)
      .subscribe({
        next: (response) => {
          this.success = true;
          this.errors = [];
          this.servico = new ServicoPrestado();
        },
        error: (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      });
  }

}
