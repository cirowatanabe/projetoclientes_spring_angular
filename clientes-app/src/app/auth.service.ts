import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL + "/auth"

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): boolean{
    return !localStorage.getItem("access_token") == null;
  }

  salvar(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.apiURL + '/register', usuario);
  }

  login(usuario: Usuario) : Observable<any>{
    return this.http.post<any>(this.apiURL + '/login', usuario);
  }
}
