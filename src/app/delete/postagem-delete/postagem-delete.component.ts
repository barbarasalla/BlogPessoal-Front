import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagems';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem= new Postagem()
  idPostagem: number

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private route: ActivatedRoute,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['Entrar'])
    }

   this.idPostagem=this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPostagem)
  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) =>{
      this.postagem = resp
    })
  }

  deletarPostagem(){
    this.postagemService.deletePostagem(this.idPostagem).subscribe(()=>{
      this.alerta.showAlertSuccess('Postagem apagada com sucesso!')
      this.router.navigate(['/inicio'])
    })
  }

}
