import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagems';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tema: Tema= new Tema()
  listaTemas: Tema[]
  idTema:number
  postagem: Postagem=new Postagem()
  usuario: User= new User()
  listaPostagens: Postagem[]

  idUsuario = environment.id

  constructor(
    private temaService: TemaService,
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token== ''){
      alert('Sua sessão expirou faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
  
    this.authService.refreshToken()
    this.findAllTemas()
    this.getPostagens()

  }

  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas=resp
    })
  }

  findByIdTema(){
    this.temaService.getById(this.idTema).subscribe((resp: Tema)=>{
      this.tema=resp
    })
  }

  getPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaPostagens=resp
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: User)=>{
      this.usuario = resp
      console.log(this.idUsuario)
    })
  }

  publicar(){
    this.postagem.tema=this.tema
    this.usuario.id = this.idUsuario

    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem=resp
      alert('Postagem publicada com sucesso!')
      this.postagem=new Postagem()
      this.getPostagens()
    })
  }
}
