import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { modalController } from '@ionic/core';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
})
export class AcceptedComponent implements OnInit {

  questAccept: any;
  myQuest: any;
  result: any;
  data: object = {
    
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
      return this.myQuest;
    })
  }

  questAccepts() {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["action"] = "questAccept";
    this.PostService.getQuestAccepts(this.data).subscribe(response => {
      this.questAccept = response["message"];
      return this.questAccept;
    })
  }

  finish(id: number) {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["idQuest"] = id;
    this.data["action"] = "finishQuest";

    this.PostService.finisQuest(this.data).subscribe(response => {
      this.result = response;
      this.questAccepts();
      return this.result;
    })
    
  }

  remove(id: number) {
    this.data["tokenUser"] = localStorage.getItem('token');
    this.data["idQuest"] = id;
    this.data["action"] = "finishQuest";

    this.PostService.finisQuest(this.data).subscribe(response => {
      this.result = response;
      this.questAccepts();
      return this.result;
    })
  }

  response(id: number) {
    let currentModal = null;
    createModal()

    async function createModal() {
      const modal = await modalController.create({
        component: 'modal-page'
      });

      await modal.present();
      currentModal = modal;
    }

    function dismissModal() {
      if (currentModal) {
        currentModal.dismiss().then(() => { currentModal = null; });
      }
    }
  }
}