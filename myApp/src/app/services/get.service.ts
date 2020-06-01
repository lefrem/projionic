import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  url: string = "http://127.0.0.1/projet/back";

  constructor(
    private http:HttpClient
  ) { }

  getQuest(data){
    data["action"] = "getQuest";
    return this.http.get(this.url,data);
  }
}
