import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  id:any
  subject:any={}
  user:any
  studentInfo:any
  total:number=0
  showResult:boolean=false
  validFlag:boolean=true
  studentSubjects:any[]=[]
  role:any
  constructor(route:ActivatedRoute , private service:DoctorService , private toastr:ToastrService,private auth:AuthService) {
    this.id=route.snapshot.paramMap.get('id')    //to get id of a shoose subject
   }

  ngOnInit(): void {
    this.getSubject()
    this.getUserInfo()
    this.getRole()
  }

  getSubject(){
    this.service.getSubject(this.id).subscribe(res=>{
      this.subject=res

    })

  }

  deleteQuestion(index:any){
    this.subject.questions.splice(index,1)
    const model ={
      name:this.subject.name,
      questions:this.subject.questions
    }
    this.service.updateSubject(model,this.id).subscribe(res=>{
      this.toastr.success("تم حذف السؤال")
    })
  }

  getUserInfo(){   // get the role of who login doctor or student
    this.auth.getRole().subscribe(res=>{
      this.user=res
      this.getUserData()   //after found the login id go to this function
    })
  }

  getUserData(){   //data of student who login to can get subject name and degree
    this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
      this.studentInfo=res
      this.studentSubjects=(res?.subjects ? res?.subjects : []) //lw mawgod 5zwn else sebha fadya
      this.cheeckValidExam()
    })
  }

  getRole(){
    this.auth.getRole().subscribe((res:any)=>{
      this.role=res
    })

  }
  cheeckValidExam(){
    for(let i in this.studentSubjects ){
      if(this.studentSubjects[i].id==this.id)
      this.validFlag=false
    }
    if(!this.validFlag && this.role.role=="students"){
      this.toastr.warning("لقد انجزت هذا الاختبار مسبقا")
    }
  }

  calculate(event:any){
    let value=event.value
    let questionIndex=event.source.name
    this.subject.questions[questionIndex].studentAnswer=value
  }

  getResult(){
    this.total=0
    for(let i in this.subject.questions){
      if(this.subject.questions[i].studentAnswer == this.subject.questions[i].correctAnswer){
        this.total++
      }
    }
    this.showResult=true
    console.log(this.showResult)
    this.studentSubjects.push({
      name:this.subject.name,
      id:this.id,
      degree:this.total
    })
    const model={
      username:this.studentInfo.username,
      email:this.studentInfo.email,
      password:this.studentInfo.password,
      subjects:this.studentSubjects
    }
    this.auth.updateStudent(this.studentInfo.id,model).subscribe(res=>{
      this.toastr.success("تم تسجيل النتيجه بنجاح")
    })
  }

}
