import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private service:AuthService , private toastr:ToastrService) { }
  userData:any = null
  flag:boolean=false
  ngOnInit(): void {
    this.service.user.subscribe((res:any)=>{
      if(res.role){
      this.userData=res
      this.flag=true
      }
    })
  }


  logout(){
    const model={}
    this.service.login(model).subscribe(res=>{
      this.toastr.success("تم تسجيل الخروج" ,"",{
        disableTimeOut:false,
        titleClass:"toastr_title",
        messageClass:"toastr_message",
        timeOut:500,
        closeButton:true
      })
      this.service.user.next(res)
      this.userData=null
    })
    this.flag=false
  }


}
