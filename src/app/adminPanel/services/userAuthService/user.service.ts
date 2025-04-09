import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { SignUp } from '../../models/SignUp.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

invalidUserAuth= new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }

  userSignUp(user:SignUp){
   this.http.post("https://3a21-103-4-117-150.ngrok-free.app/signUp/post",user,{observe:'response',headers:{
    'Content-Type':'application/json',
    'ngrok-skip-browser-warning':'true'
   }})
   .subscribe((result)=>{
    if(result){
      localStorage.setItem('user',JSON.stringify(result.body));
      this.router.navigate(['/']);
    }
    
   })
    
  }
  
  userLogin(data:Login){
    this.http.get<SignUp[]>(`http://localhost:8080/signUp/getUser?username=${data.username}&password=${data.password}`,
    {observe:'response'}
    ).subscribe((result)=>{

      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
        this.invalidUserAuth.emit(false)
      }else{
        this.invalidUserAuth.emit(true)
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
