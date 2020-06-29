import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = "http://127.0.0.1/projet/back";

  constructor(
    private http:HttpClient
  ) { }

  postNewUser(data){
    data["action"] = "newUser";
    return this.http.post(this.url,data);
  }
  
  postConnection(data){
    data["action"] = "connection";
    return this.http.post(this.url,data);
  }

  postNewQuest(data){
    data["action"] = "newQuest";
    return this.http.post(this.url,data);
  }

  postQuestToUser(data){
    data["action"] = "questToUser";
    return this.http.post(this.url,data);
  }

  getQuest(data){
    return this.http.post(this.url,data);
  }

  getMyQuest(data){
    return this.http.post(this.url,data);
  }

  getQuestAccepts(data){
    return this.http.post(this.url,data);
  }

  finisQuest(data){
    return this.http.post(this.url,data);
  }

  checkToken(data){
    return this.http.post(this.url,data);
  }

}