import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import * as moment from 'moment';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit{

  cliente: Cliente;
  dataFormatada = (moment(new Date())).format('DD/MM/YYYY');

  constructor(){
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(){
    console.log(this.cliente);
  }

}
