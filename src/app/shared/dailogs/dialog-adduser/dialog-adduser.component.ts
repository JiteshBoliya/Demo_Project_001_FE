import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DeshboardService } from '../../service/deshboard.service';

@Component({
  selector: 'app-dialog-adduser',
  templateUrl: './dialog-adduser.component.html',
  styleUrls: ['./dialog-adduser.component.css']
})
export class DialogAdduserComponent implements OnInit {
  // @ViewChild('fileInput') fileInput!: ElementRef;
  // public assignmentForm !: FormGroup;
  // fileAttr = 'Choose File';
  // text="no Files"
  // userid!: string;
  // image:any
  // files:[]|any;
  // classId: any;
  @ViewChild('fileInput') fileInput!: ElementRef;
  public userForm !: FormGroup;
  userData: any
  user: any
  image: any;
  text: any;
  path: any
  imageSrc: any;
  userlist: any;
  isUpdate: boolean = false;
  gender: any;
  myVal: any;
  constructor(private  dialog:  MatDialog, 
    private router: Router,
    private deshboard: DeshboardService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.userForm = new FormGroup({
      name: new FormControl(this.userData?this.userData.name:'', Validators.required),
      email: new FormControl(this.userData?this.userData.email:'', [Validators.required,Validators.email]),
      gender: new FormControl(this.userData?this.userData.gender:'', Validators.required),
      mobileno: new FormControl(this.userData?this.userData.mobileno:'', Validators.required),
      dob: new FormControl(this.userData?this.userData.dob:'', Validators.required),
      file: new FormControl(this.userData?this.userData.file[0]:'', Validators.required)
    })
  

    
    this.imageSrc="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
    
    this.deshboard.getUserlist().subscribe(res => {
      if(this.deshboard.userData!=''){
        this.userData =  this.deshboard.userData
        this.deshboard.userData=''
        this.imageSrc="http://localhost:3000/"+ this.userData.file[0].path

    // console.log(this.userData);
    // this.gender=this.deshboard.userData
        
      }
      else
      {  this.userData = ''
      }
      console.log(this.userData);
      
      // this.userForm = new FormGroup({
      //   name: new FormControl(this.userData?this.userData.name:'', Validators.required),
      //   email: new FormControl(this.userData?this.userData.email:'', [Validators.required,Validators.email]),
      //   gender: new FormControl(this.userData?this.userData.gender:'', Validators.required),
      //   mobileno: new FormControl(this.userData?this.userData.mobileno:'', Validators.required),
      //   dob: new FormControl(this.userData?this.userData.dob:'', Validators.required),
      //   file: new FormControl(this.userData?this.userData.file[0]:'', Validators.required)
      // })
      this.userlist = res
    })
   
  }
  uploadFileEvt(imgFile: any) {
    this.text = imgFile.target.files[0].name
    this.image = imgFile.target.files[0]
    console.log(imgFile.target.files[0]);

    const file = imgFile.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
  }
  submitdata(massege: any, close: any, classname: any) {
    const value = this.userForm.value
    let formData = new FormData()
    formData.append('name', value['name'])
    formData.append('email', value['email'])
    formData.append('gender', value['gender'])
    formData.append('mobileno', value['mobileno'])
    formData.append('dob', value['dob'])
    formData.append('file', this.image)
    console.log(value)

    if(this.userData!='') {
        this.update(classname,formData)
    }
    else{
    this.deshboard.AddUserlist(formData)
      .subscribe((res) => {
        this.snackBar.open(massege, close, {
          duration: 2000,
          panelClass: [classname]
        });

        this.deshboard.getUserlist().subscribe(res => {
          this.userlist = res
        })
        this.clear()
      })
    }
  }
  clear() {
    this.userForm.reset()
    this.image = ''
    // this.imageSrc = ''
  }
  update(classname:any,formData:any){
    this.deshboard.UpadteUserlist(this.userData._id,formData).subscribe(res=>{
      this.snackBar.open("Updated","close", {
              duration: 2000,
              panelClass: [classname]
            });
            this.deshboard.getUserlist().subscribe(res => {
              this.userlist = res
              console.log(res);
            })
            this.clear()
    })
  }
  
  
}
