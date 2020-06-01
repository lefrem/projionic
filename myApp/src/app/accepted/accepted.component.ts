import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { log } from 'util';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
})
export class AcceptedComponent implements OnInit {

  questAccept: any;
  myQuest: any;
  data: object = {
    tokenUser : null,
    action : null,
  }

  constructor(
    private PostService:PostService,
  ) { }

  ngOnInit() {    
    this.myQuests();
    this.questAccepts();
  }

  myQuests() {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["action"] = "myQuest";
    this.PostService.getMyQuest(this.data).subscribe(response => {
      this.myQuest = response["message"];
      console.log(response);
      return this.myQuest;
    })
  }

  questAccepts() {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["action"] = "questAccept";
    this.PostService.getQuestAccepts(this.data).subscribe(response => {
      this.questAccept = response["message"];
      console.log(response["message"]);
      return this.questAccept;
    })
  }

}
