/*import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { HTTP } from '@angular/common/http'
import { Students } from '../students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseUri:string="http://localhost:5000/";
  private headers = new HttpHeaders().set('Content-Type','application/json');

  constructor(private http:HttpClient) { }
  createStudents(stdnt:Students){
   // return this.http.post(this.baseUri + 'api/students/',stdnt,{headers:this.headers});
  }

  readStudents(){
    return this.http.get(this.baseUri + 'api/students/',{headers:this.headers});
  }

}*/
