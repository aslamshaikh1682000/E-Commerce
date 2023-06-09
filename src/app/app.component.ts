import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './Services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router:Router,private userService:UserService){
    
  }

  ngOnInit(): void {
    let arr = localStorage.getItem('token');
    if(arr){
      this.router.navigate(['home/my-profile']);
      return;
    }
   this.router.navigate(['auth/login']);
  }
  title = 'E-Commerce';

 
}
