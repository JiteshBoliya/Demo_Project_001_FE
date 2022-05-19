import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
// import { DeshboardService } from '../../service/deshboard.service';
@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit{
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  public assignmentForm !: FormGroup;
  fileAttr = 'Choose File';
  text="no Files"
  userid: string | undefined;
  image:any
  files:[]|any;
  classId: any;

  constructor(private  dialog:  MatDialog, 
              private  router:  Router,
              private activeRoute:ActivatedRoute,
              private dialogRef: MatDialogRef<DialogUserComponent>) { }
  ngOnInit(): void {
    this.assignmentForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      points: new FormControl("", Validators.required),
      duedate: new FormControl("", Validators.required),
      file: new FormControl("", Validators.required)    
    })
  }
  
  uploadFileEvt(imgFile: any) {
    this.text=imgFile.target.files[0].name
    this.image=imgFile.target.files[0]
  }
  submitdata(){
    const value = this.assignmentForm.value
    let formData= new FormData()
    formData.append('title', value['title'])
    formData.append('description', value['description'])
    formData.append('points', value['points'])
    formData.append('duedate', value['duedate'])
    formData.append('file',this.image)
    formData.append('classsub',this.classId)
    
    // this.assign.addAssignment(formData)
    //     .subscribe((res)=>{
    //       console.log(res)
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'success',
    //     title: 'Assignment Posted '+value['title'], 
    //     showConfirmButton: false,
    //     timer: 1500
    //   })
    //   this.assignmentForm.reset()
    //   this.dialogRef.close();
    // })
  }
}
