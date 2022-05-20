import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeshboardService {
  private userUrl="http://localhost:3000/user"
  private userlistUrl="http://localhost:3000/userlist"
  public userData:any=''
  public isUpdate:any=false
  public usermail:any
  constructor(private http:HttpClient) { }


  getUserDetail(id:any){
    return this.http.get<any>(`${this.userUrl}/`+id)}

  AddUserlist(data:any){
    return this.http.post<any>(this.userlistUrl,data)}
  
  UpadteUserlist(id:any,data:any){
    return this.http.post<any>(`${this.userlistUrl}/update/`+id,data)}
  
  DeleteUserlist(id:any){
    return this.http.get<any>(`${this.userlistUrl}/delete/`+id)}
    
  getUserListDetail(id:any){
    return this.http.get<any>(`${this.userlistUrl}/getData/`+id)}
  
  getUserlist(){
    return this.http.get<any>(this.userlistUrl)
  }
  sortdata(sortby:any,sortwith:any){
    return this.http.get<any>(`${this.userlistUrl}/sort/`+sortby+`/`+sortwith)
  }
  getallUserlist(){
    return this.http.get<any>(`${this.userlistUrl}/all`)
  }
  getpage(page:any){
    return this.http.get<any>(`${this.userlistUrl}/pagger/`+page)
  }
  sendMail(data:any){return this.http.post(`${this.userUrl}/mail`,data)}
}
