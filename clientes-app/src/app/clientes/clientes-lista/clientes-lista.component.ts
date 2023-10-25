import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  success: boolean = false;
  errors: String[];

  constructor(
    private service: ClientesService, 
    private router: Router
  ) { }


  ngOnInit(): void {
    this.service
      .getAll()
      .subscribe(response => this.clientes = response);
  }

  novoCadastro(){
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  excluirCliente(id: number){
    this.service.delete(id)
      .subscribe({
        next: (v) => {
          this.success = true;
          this.errors = [];
          this.ngOnInit();
        },
        error: (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      })
  }

}
