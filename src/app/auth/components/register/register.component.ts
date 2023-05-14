import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm !:FormGroup
  students :any []=[]
  constructor(private fb:FormBuilder,private service:AuthService,private router:Router,private toster:ToastrService) { }
  ngOnInit(): void {
    this.createForm()
    this.getStudents()
  }

  createForm(){
    this.userForm=this.fb.group({
      username:['',[Validators.required]],
      email:['',Validators.required,Validators.email],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
  }

  getStudents(){
    this.service.getUser('students').subscribe((res:any)=>{
      this.students=res
    })
  }
  submit(){
    const model ={
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    let index = this.students.findIndex(item=>item.email == this.userForm.value.email)
    if(index !== -1){
      this.toster.error("هذا الايميل موجود مسبقا","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:2000,
        closeButton:true
      })
    }
    else{
      this.service.createUser(model).subscribe(res=>{
       this.toster.success("تم انشاء الحساب بنجاح","",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:500,
        closeButton:true
      })

      })
    }

  }









}
