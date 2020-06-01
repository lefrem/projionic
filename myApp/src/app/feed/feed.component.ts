import { AppComponent } from './../app.component';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  result: any;
  data: object ={
    "action" : "getQuest"
  };
  dataAddQuest: object ={
    tokenUser : null,
    idQuest : null,
  };
  dataQuest: object = {
    tokenUser : null,
    title : null,
    content : null,
  };

  constructor(
    private PostService:PostService,
    private router:Router,
    private AppComponent:AppComponent
  ) { }

  questForm = new FormGroup({
    title: new FormControl(null,[
      Validators.required,
      //Validators.pattern()
    ]),
    content: new FormControl(null,[
      Validators.required,
      //Validators.pattern()
    ]),
  });

  ngOnInit() {
    this.getQuest()
  }

  getQuest() {
    this.PostService.getQuest(this.data).subscribe(response => {
      this.result = response["message"];
      return this.result;
    })
  }

  addQuest(id:number) {
    let result;
    this.dataAddQuest["tokenUser"] = localStorage.getItem('token');
    this.dataAddQuest["idQuest"] = id;
    this.PostService.postQuestToUser(this.dataAddQuest).subscribe(response => {
      result = response;
      return this.result;
    })
  }

  submitQuest() {
    let result;
    this.dataQuest["tokenUser"] = localStorage.getItem('token');
    this.dataQuest["title"] = this.questForm.controls.title.value;
    this.dataQuest["content"] = this.questForm.controls.content.value;    

    this.PostService.postNewQuest(this.dataQuest).subscribe(response => {
      result = response;
      if (result["success"] == true) {
        this.questForm.setValue({
          title:"",
          content:""
        })
        this.getQuest()
      }
    })
  }
}