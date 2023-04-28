import { Injectable } from '@angular/core';
import { Register, User, Login, CompanyDetails } from '../Interfaces/interfaces.module';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoginTrue = new BehaviorSubject<boolean>(false);
  companyHeaderShow = new BehaviorSubject<boolean>(false);
  
  baseUrl = "https://shop-api.ngminds.com/";

  constructor(private http:HttpClient,private tokenService:TokenService) {
      // let arr = localStorage.getItem('users') || '[]';
      // let userArray = JSON.parse(arr);
      // for(let user of userArray){
      //   if(user.isLogin){
      //     this.userLoginTrue.next(true);
      //   }
      // }

      if(tokenService.getToken()){
        this.userLoginTrue.next(true);
        //console.log("User From Service",this.user)
      }
  }
  
  user:any = {}

  //Login Api
  login(data:Login){
    let url = this.baseUrl+"auth/login?captcha=false";
    return this.http.post(url,data);
  }

  //Register User Api
  register(data:any){
   // let t = localStorage.getItem('token');
    //let header = new HttpHeaders({'Content-Type': 'application/json','Authorization': "Bearer "+t})
    let url = this.baseUrl+"auth/register?captcha=false";

    // var header = new HttpHeaders();
    // header.append('Content-Type', 'application/json');
    // header.append("Authorization", "Bearer " + t);

    //     const httpOptions = {
    //       headers: header
    //     };

    return this.http.post(url,data);
  }

  //Get Singal User Using Token Api
  getUser(){
    //let t = JSON.parse(localStorage.getItem('token') || '');
    let token = this.tokenService.getToken();
    let url = this.baseUrl+"auth/self";
       const httpOptions = {
          headers: new HttpHeaders({ 
            'Content-Type':'application/json',
            'Authorization': `bearer ${token}`
          })
        };
        return this.http.get(url,httpOptions)
  }

  //Update Company Information Api  
  updateCompanyInfo(companyData:CompanyDetails){
      let url = this.baseUrl + "users/org";
      let token = this.tokenService.getToken();

      const httpOptions = {
        headers: new HttpHeaders({ 
          'Content-Type':'application/json',
          'Authorization': `bearer ${token}`
        })
      };
      return this.http.patch(url,companyData,httpOptions)
  }

  //get All Users Api
  getAllUsers(){
    let token = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };

    let url = this.baseUrl + "users";
    return this.http.get(url,httpOptions);
  }

  //Create User Api
  createUser(data:any){
    let token = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };

    let url = this.baseUrl + "users";
    return this.http.post(url,data,httpOptions)
  }

  //Update User Information Api
  updateUserInfo(data:any,userId:string){
    let token = this.tokenService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    console.log(data);
    let url = this.baseUrl + "users/"+userId;
    return this.http.patch(url,data,httpOptions)
  }


  //update User Role
  updateUserRole(userId:string,userRole:string){
    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    let url = this.baseUrl + "users/role/"+userId;
    return this.http.patch(url,{role:userRole},httpOptions);
  }

  //Delete User
  deleteUser(userId:string) {
    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    let url =  this.baseUrl+ "users/"+userId;
    return this.http.delete(url,httpOptions);
  }
  
  //Pagination Api
  sortByQueryParams(data:string){
    //let url = `https://shop-api.ngminds.com/users?sortBy=name`;
    let url = `https://shop-api.ngminds.com/users?sortBy=${data}`;  

   
    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    return this.http.get(url,httpOptions);
  }

  sortWithLimit(data:any,limit:any,page:any){
    let url = `https://shop-api.ngminds.com/users?limit=${limit}&page=${page}&sortBy=${data}`;
    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    return this.http.get(url,httpOptions);
  }

  getUsersByLimit(limit:any){
      let url = `https://shop-api.ngminds.com/users?limit=${limit}`;

      let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    return this.http.get(url,httpOptions);
  }

  getUsersByPageAndLimit(limit:any,page:any){
    let url = `https://shop-api.ngminds.com/users?limit=${limit}&page=${page}`;

    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      })
    };
    return this.http.get(url,httpOptions);
  }


  httpParamsApi(){
    let url = `https://shop-api.ngminds.com/users`;

    var pr  = new HttpParams();
    pr.set('sortBy','email');
    pr.set('role','user');
    pr.set('limit','2')
    pr.set('page','1');


    let token = this.tokenService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type':'application/json',
        'Authorization': `bearer ${token}`
      }),
      params: new HttpParams().set('sortBy','email').set('role','user').set('limit','2').set('page','1')
    };
    return this.http.get(url,httpOptions);
  }

 

}
