import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURL + '/api/clientes';

  constructor(private http : HttpClient) { }

  salvar(cliente : Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.apiURL, cliente);
  }

  atualizar(cliente : Cliente) : Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL + '/' + cliente.id}`, cliente);
  }

  getAll() : Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiURL);
  }

  getById(id: number) : Observable<Cliente>{
    return this.http.get<any>(this.apiURL + `/${id}`);
  }

  delete(id: number) : Observable<any>{
    return this.http.delete<any>(this.apiURL + `/${id}`);
  }
}
