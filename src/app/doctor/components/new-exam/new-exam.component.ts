import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {

  name=new FormControl("")
  questionsForm !:FormGroup
  questions :any[]=[]
  correctNum:any
  subName:any
  startFlag:boolean=false
  preview:boolean=false
  stepperindex=0
  id:any
  constructor(private fb : FormBuilder , private toastr:ToastrService,private service:DoctorService) { }

  ngOnInit(): void {
    this.createForm()
  }
  changeSubName(){
    if(this.name.value == ""){
      this.toastr.error("يرجي ادخال اسم الماده")
      this.startFlag=false
      this.subName=""
    }
    else{
      this.startFlag=true
      this.subName=this.name.value
    }
    if(this.startFlag==true){
      this.stepperindex=2
    }
  }
  createForm(){
    this.questionsForm=this.fb.group({
      question:['',[Validators.required]],
      answer1:['',[Validators.required]],
      answer2:['',[Validators.required]],
      answer3:['',[Validators.required]],
      answer4:['',[Validators.required]],
    })
  }

  createQuestion(){
    if(this.correctNum){
      const model={
        question:this.questionsForm.value.question,
        answer1:this.questionsForm.value.answer1,
        answer2:this.questionsForm.value.answer2,
        answer3:this.questionsForm.value.answer3,
        answer4:this.questionsForm.value.answer4,
        correctAnswer:this.questionsForm.value[this.correctNum]
      }
      this.questions.push(model)
      this.questionsForm.reset()
    }
    else{
      this.toastr.error("يرجى اختيار الاجابه الصحيحة")
    }

  }

  getCorrect(event:any){
    this.correctNum=event.value
  }

  submit(){
    const model={
      name:this.subName,
      questions:this.questions
    }
    if(this.preview==true){
      this.stepperindex=2
    }
    else{
      this.service.createSubject(model).subscribe((res:any)=>{
        this.preview=true
        this.id=res.id
      })
    }
  }

  clearForm(){
    this.questionsForm.reset()
  }

  cancle(){
    this.questionsForm.reset()
    this.name.reset()
    this.stepperindex=0
    this.startFlag=false
    this.questions=[]
    this.subName=""
  }


  deleteQuestion(index:number){
    this.questions.splice(index,1)
    const model={
      name:this.subName,
      question:this.questions
    }
    this.service.updateSubject(model,this.id).subscribe(res=>{
      this.toastr.success("تم حذف السؤال")
    })
  }




}
