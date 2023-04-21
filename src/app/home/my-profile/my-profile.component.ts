import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private router:Router,private userService:UserService,private _snackBar: MatSnackBar) {
    this.name = userService.user.name;
    this.email = userService.user.email;
    this.companyName = userService.user.companyName;
    this.role = userService.user.role;
    console.log('User Logged In');
   }

  ngOnInit(): void {
  }

  isEdit:boolean = true;

  name:string;
  email:string;
  role:string;
  companyName:string;

  // logout(){
  //   let arr = localStorage.getItem('users') || '[]';
  //   let userArr = JSON.parse(arr);
  //   for(let user of userArr){
  //     if(user.email === this.userService.user.email){
  //       user.isLogin = false;
  //       localStorage.setItem('users',JSON.stringify(userArr));
  //     }
  //   }
  //   console.log(this.userService.user);
  //   this.router.navigate(['auth/login'])
  // }

  edit(){
    this.isEdit = false;
  }

  isRoleValid:boolean = true;

  editProfile(){
    this.role = this.role.trim();

    if(this.checkName(this.name) && this.role == 'user' || this.role == 'Admin'){
      let arr = localStorage.getItem('users') || '[]';
      let userArray = JSON.parse(arr);

      for(let user of userArray){
        if(user.email == this.email){
          user.name = this.name;
          user.role = this.role;
          user.companyName = this.companyName;
          this.isEdit = true;
          this.isValidName = false;
          localStorage.setItem('users', JSON.stringify(userArray));
          this._snackBar.open('Profile Updated Successfully','X',{duration:3000})
          return;
        }
      }
    }
    else{
      this.isRoleValid = false;
      this._snackBar.open('Please Enter Valid Details','X',{duration:3000})
    }
  }

  isValidName:boolean = false;
  
  checkName(name:string){
    if(name==""){
      this.isValidName = false;
      return false;
    }
    for(let i=0;i<name.length;i++){
      if(name.charAt(i)!=' ' && name.charAt(i)<'A' || name.charAt(i)>'z'){
        this.isValidName = false;
        return false;
      }
    }
    this.isValidName = true;
    return true;
}

cancelEditProfile(){
  this.isEdit = true;
}

}