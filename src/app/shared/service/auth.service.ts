import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { initializeApp } from 'firebase/app';
import {AuthCredential} from '@angular/fire/auth';

// import { User } from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private url="http://localhost:3000/user"
  userId:any

  // #User subject for storing current userinfo
  usersubject=new BehaviorSubject<null>(null);
  

  // firebaseConfig = {
  //   apiKey: "AIzaSyCqc0b-RjDIEWUx43KGL7F7VdfwUsogoqw",
  //   authDomain: "fir-7fe77.firebaseapp.com",
  //   projectId: "fir-7fe77",
  //   storageBucket: "fir-7fe77.appspot.com",
  //   messagingSenderId: "413576339360",
  //   appId: "1:413576339360:web:d37d8086ab620fd4ae0ec5"
  // };
  // app = initializeApp(this.firebaseConfig);


  constructor(private http:HttpClient,
              private router:Router,
              // public afAuth: AngularFireAuth
              ) {}

  updateUser(data:any){
    this.usersubject.next(data)}

  userLogin(user:any):Observable<any>{
    return this.http.post<any>(`${this.url}/login`,user)}

  getToken(){
    return localStorage.getItem('userData')}
  
  getUser(id:any):Observable<any>{
    return this.http.get<any>(`${this.url}/`+id)}

  logout(user:any){
    return this.http.post<any>(`${this.url}/logout`,user)}
  
  // #Auto Login
  loggedIn(){
    return !!localStorage.getItem('userData')}

  RegisterManual(user:any){
    return this.http.post<any>(`${this.url}/register`,user)
  }

  LoginManual(user:any){
    return this.http.post<any>(`${this.url}/userlogin`,user)
  }

  authoLogin(){
    if(this.loggedIn()){
      this.router.navigate(['/home'])
    }
  }

  twitterLogin(){
    return this.http.get<any>('http://localhost:3000/twitter')
  }

// checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }
// doFacebookLogin(){
//   return new Promise<any>((resolve, reject) => {
//     let provider = new firebase.auth.FacebookAuthProvider();
//     this.afAuth.auth
//     .signInWithPopup(provider)
//     .then(res => {
//       resolve(res);
//     }, err => {
//       console.log(err);
//       reject(err);
//     })
//   })
// }


}
