import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { switchMap, map, startWith } from 'rxjs/operators';
import { interval } from 'rxjs';
import { connect } from 'http2';


@Injectable({
  providedIn: 'root'
})

export class DataService {

  apiKey:'WFdKaVh3UFJvWm5CazFrbVpqTFJuaEhLZms3OGR1YitUK3FPRk5NSjR4QnlmaVFtSnNvaFFpU0FSYzE3SXNaTS0tWnBRcjIxOUdVRnNpcVNWZzAzVHJFdz09--5d525ed70a59b241ab0018198c3333aaf583b29d'

  constructor(private http:HttpClient) { }

  getStats(id){
    let headers = new HttpHeaders().set('apiKey','WFdKaVh3UFJvWm5CazFrbVpqTFJuaEhLZms3OGR1YitUK3FPRk5NSjR4QnlmaVFtSnNvaFFpU0FSYzE3SXNaTS0tWnBRcjIxOUdVRnNpcVNWZzAzVHJFdz09--5d525ed70a59b241ab0018198c3333aaf583b29d')
    return this.http.get(`https://api.nexusmods.com/v1/games/subnautica/mods/${id}.json`,{headers})
    // return interval(5000)//60000
    // .pipe(
    //   startWith(0),
    //   switchMap(()=> this.http.get(`https://api.nexusmods.com/v1/games/subnautica/mods/${id}.json`,{headers})),
    //   map(res => res)
    // )
  }
}
