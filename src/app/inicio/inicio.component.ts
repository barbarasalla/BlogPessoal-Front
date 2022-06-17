import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagems';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
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
  nomePostagem: string
  nomeTema: string

  idUsuario = environment.id

  key= 'data'
  reverse = true

  constructor(
    private temaService: TemaService,
    private router: Router,
    private postagemService: PostagemService,
    private authService: AuthService,
    private alerta: AlertasService
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
      this.alerta.showAlertSuccess('Postagem publicada com sucesso!')
      this.postagem=new Postagem()
      this.getPostagens()
    })
  }

  
  findByTituloPostagem(){
    if(this.nomePostagem==''){
      this.getPostagens()
    }else{
      this.postagemService.getByTituloPostagem(this.nomePostagem).subscribe((resp: Postagem[]) => {
        this.listaPostagens=resp
      } )
    }
  }

  findByNomeTema(){
    if(this.nomeTema==''){
      this.findAllTemas()
    }else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp:Tema[]) => {
        this.listaTemas=resp
      } )
    }
  }
}
