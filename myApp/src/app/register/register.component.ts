import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  errorMsg: any;
  successMsg: any;
  msg: string;
  error: boolean = false;
  form: boolean = true;
  success: boolean = false;
  result : object;

  dataUser: object = {
    lname : null,
    fname : null,
    phone : null,
    mail : null,
    username : null,
    pass : null,
  }

  registerForm = new FormGroup({
    lname: new FormControl(null,[
    ]),
    fname: new FormControl(null,[
    ]),
    phone: new FormControl(null,[
      //Validators.pattern(regex 10 numbers)
    ]),
    mail: new FormControl(null,[
      Validators.required,
      //Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
    ]),
    cmail: new FormControl(null,[
      Validators.required,
      //Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')
    ]),
    username: new FormControl(null,[
      Validators.required
    ]),
    pass: new FormControl(null,[
      Validators.required,
      //Validators.pattern(regex password)
    ]),
    cpass: new FormControl(null,[
      Validators.required,
      //Validators.pattern(regex password)
    ])
  });

  submitRegister() {
    this.error = false;

    if (this.registerForm.controls.mail.value != this.registerForm.controls.cmail.value) {
      this.error = true;
      return this.errorMsg = [{message : 'Les emails ne match pas entre eux'}];
    }

    if (this.registerForm.controls.pass.value != this.registerForm.controls.cpass.value) {
      this.error = true;
      return this.errorMsg = [{message : 'Les pass ne match pas entre eux'}];
    }

    this.dataUser["lname"] = this.registerForm.controls.lname.value;
    this.dataUser["fname"] = this.registerForm.controls.fname.value;
    this.dataUser["phone"] = this.registerForm.controls.phone.value;
    this.dataUser["mail"] =  this.registerForm.controls.mail.value;
    this.dataUser["username"] = this.registerForm.controls.username.value;
    this.dataUser["pass"] =  this.registerForm.controls.pass.value;

    this.PostService.postNewUser(this.dataUser).subscribe(respose => {
      this.result = respose;
      if (this.result["success"] == false) {
        this.error = true;
        return this.errorMsg = [{message : this.result["message"]}];
      }
      if (this.result["success"] == true) {
        this.form = false;
        this.success = true;
      }
    })
  }

  constructor(
    private PostService:PostService
  ) { }

  ngOnInit() {}

}
