import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cadastrando: boolean;
  usuario: Usuario = new Usuario();
  successMessage: string = "";
  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  onSubmit(){
    this.logar();
  }

  prepararCadastrar(event: any){
    event.preventDefault();
    this.usuario = new Usuario();
    this.cadastrando = true;
  }

  cancelarCadastrar(event: any){
    event.preventDefault();
    this.usuario = new Usuario();
    this.cadastrando = false;
    this.errorMessages = [];
    this.successMessage = "";
  }

  cadastrar(){
    this.authService.salvar(this.usuario)
      .subscribe({
        next: (response) => {
          this.successMessage = "Cadastro realizado com sucesso!";
          this.errorMessages = [];
          this.usuario = new Usuario();
        },
        error: (errorResponse) => {
          this.successMessage = "";
          this.errorMessages = errorResponse.error.errors;
        }
      });
  }

  logar(){
    this.authService.login(this.usuario)
      .subscribe({
        next: (response) => {
          console.log(response);
          const access_token = JSON.stringify(response);
          localStorage.setItem("access_token", access_token);
          this.router.navigate(['/home']);
        },
        error: (errorResponse) => {
          this.successMessage = "";
          this.errorMessages = errorResponse.error.errors;
        }
      })
  }
}
