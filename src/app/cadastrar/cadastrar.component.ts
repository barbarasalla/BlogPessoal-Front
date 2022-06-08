import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User();

  confirmaSenha: string;

  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmarSenha(event: any){
    this.confirmaSenha= event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo=this.tipoUsuario

    if(this.user.foto=='' || this.user.foto==null){
      this.user.foto='https://imgur.com/bwjrtfI.png'
    }

    if(this.user.senha != this.confirmaSenha){
      alert('As senhas estão incorretas.')
    } else{
      this.authService.cadastrar(this.user).subscribe((resp: User)=> {
        this.user=resp
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })     
    }
  }
}
