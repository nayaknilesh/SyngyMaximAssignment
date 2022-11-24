import { Component, OnInit } from '@angular/core';
import {FormGroup,FormArray,FormControl, FormBuilder, Validators} from '@angular/forms';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student:any=FormGroup;
  educationaldetail:any=FormArray;
  constructor( private fb:FormBuilder , private stud:StudentService) { }

  ngOnInit(): void {
    this.addform();
    this.addRow();
  }
  

  addform(){
    this.student=this.fb.group({
      
      fname:new FormControl('',[Validators.required,Validators.minLength(3)]),
      username:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.email,]),
      dob:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[0-9]*')]),


      studentArray:new FormArray([])

    })
  }
  addRow(){
    this.educationaldetail=this.student.get('studentArray') as FormArray;
    this.educationaldetail.push(this.generateRow())
  }
  get studentQualification(){
    return this.student.get('studentArray') as FormArray;
    
  }
  generateRow(){
    return new FormGroup({ 
      clg:new FormControl('',[Validators.required]),
      degree:new FormControl('',[Validators.required]),
      mark:new FormControl('',[Validators.required,Validators.pattern("[0-9]+([\.,][0-9]+)?")]),
      from:new FormControl('',[Validators.required]),
      to:new FormControl('',[Validators.required])
    })
  }

  dataSave(){
    console.log(this.student,'studentdata');
   
    let payload={
      fname:this.student.controls.fname.value,
      user:this.student.controls.username.value,
      email:this.student.controls.email.value,
      dob:this.student.controls.dob.value,
      phone:this.student.controls.phone.value,
      studentArray:this.student.controls.studentArray.value

     
  }
   this.stud.creat(payload).subscribe((res:any)=>{
    console.log(res);
    this.student.reset()
   }) 
   
  }
}
