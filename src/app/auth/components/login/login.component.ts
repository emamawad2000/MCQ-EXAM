import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !:FormGroup
  type:string="students"
  userarr :any[]=[]
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router , private toaster:ToastrService)   { }

  ngOnInit(): void {
    this.getUser()
    this.createForm()
  }

  detectType(event:any){
    this.type=event.value
    this.getUser()
  }

  createForm(){
    this.loginForm=this.fb.group({
      type:[this.type],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
    })
  }

  getUser(){
    this.service.getUser(this.type).subscribe((res:any)=>{
      this.userarr=res

    })
  }

  submit(){
    // const model={
    //   email:this.loginForm.value.email,
    //   password:this.loginForm.value.password
    // }
    let index=this.userarr.findIndex(item=>item.email == this.loginForm.value.email && item.password == this.loginForm.value.password)
    if(index == -1){
      this.toaster.error("كلمه السر او الايميل خطأ" ,"",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:500,
        closeButton:true
      })
    }
    else{
      const model={
        username:this.userarr[index].username,
        role:this.type,
        userId:this.userarr[index].id
      }
      this.service.login(model).subscribe(res=>{
        this.toaster.success("تم الدخول بنجاح" ,"",{
          disableTimeOut:false,
          titleClass:"toastr_title",
          messageClass:"toastr_message",
          timeOut:2000,
          closeButton:true
        })
        this.router.navigate(['/subjects'])
        this.service.user.next(res)
      })
    }

  }











}
