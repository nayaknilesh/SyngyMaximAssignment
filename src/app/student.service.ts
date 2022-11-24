import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor( private http:HttpClient) { }

  api= "http://localhost:3000/studentData";

  public creat(Data:any):Observable<any>{
    return this.http.post<any>(this.api ,Data);
  }
}
