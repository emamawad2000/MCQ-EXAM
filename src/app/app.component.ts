
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MCQ-Exam';
  constructor(private service:AuthService){}
  ngOnInit(): void {
    this.getuser()
  }


  getuser(){
    this.service.getRole().subscribe(res=>{
      this.service.user.next(res)
    })

  }



}
