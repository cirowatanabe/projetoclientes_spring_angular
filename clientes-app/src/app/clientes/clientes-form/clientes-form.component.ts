import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Cliente } from '../cliente';
import * as moment from 'moment';
import { ClientesService } from 'src/app/clientes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  dataFormatada = (moment(new Date())).format('DD/MM/YYYY');
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    let params : Observable<Params> = this.activatedRoute.params;
    params.subscribe( urlParams => {
      this.id = urlParams['id'];
      if (this.id){
        this.service
          .getById(this.id)
          .subscribe({
            next: (response) => {
              this.cliente = response;
            },
            error: (errorResponse) => {
              this.errors = errorResponse.error.errors;
              this.cliente = new Cliente();
            }
          })
      }
    })
    
  }

  onSubmit() {
    if (this.id){
      this.service.atualizar(this.cliente)
        .subscribe({
          next: (response) => {
            this.success = true;
            this.errors = [];
          },
          error: (errorResponse) => {
            this.errors = errorResponse.error.errors;
            this.success = false;
          }
    })
    } else{
      this.service
        .salvar(this.cliente)
        .subscribe({
          next: (v) => {
            this.success = true;
            this.errors = [];
            this.cliente = v;
          },
          error: (errorResponse) => {
            this.errors = errorResponse.error.errors;
            this.success = false;
          },
          complete: () => console.log('pronto')
        })
    }

  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista'])
  }

}
