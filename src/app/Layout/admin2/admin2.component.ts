import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogUserComponent } from 'src/app/shared/dailogs/dialog-user/dialog-user.component';
import { DialogAdduserComponent } from 'src/app/shared/dailogs/dialog-adduser/dialog-adduser.component';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { DeshboardService } from 'src/app/shared/service/deshboard.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin2',
  templateUrl: './admin2.component.html',
  styleUrls: ['./admin2.component.css']
})
export class Admin2Component implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  public userForm !: FormGroup;
  public filterForm !: FormGroup;
  userData!: any
  user!: any
  image!: any;
  text!: any;
  path!: any
  imageSrc!: any;
  userlist!: any;
  isUpdate: boolean = false;
  lenth!:any
  paggerno!:any
  fakearray!:any
  isSelected!:any
  
  // colname!: boolean 
  // colimage!: boolean
  // colmobile!: boolean
  // colemail!: boolean 
  // colgender!: boolean
  // colbirthdate!: boolean;

  constructor(private router: Router,
    private authGurd: AuthGuard,
    private dialog: MatDialog,
    private deshboard: DeshboardService,
    private snackBar: MatSnackBar,
    private activeRoute: ActivatedRoute) {
      // this.colname=true
      // this.colbirthdate=true
      // this.colemail=true
      // this.colgender=true
      // this.colimage=true
      // this.colmobile=true
  }

  ngOnInit(): void {
    this.authGurd.canActivate()
    this.deshboard.getUserDetail(localStorage.getItem('userid')).subscribe(res => {
      this.user = res
    })
    this.isSelected=0

    this.userForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      mobileno: new FormControl("", Validators.required),
      dob: new FormControl("", Validators.required),
      file: new FormControl("", Validators.required)
    })

    this.filterForm=new FormGroup({
      sortwith:new FormControl(''),
      sortby:new FormControl('')
    })

    this.deshboard.getUserlist().subscribe(res => {
      this.userlist = res
    })

    this.refreash()

    this.userData = ''
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
  // listcol(name:any){
  //   if(name=='image')
  //   {
  //     if(this.colimage==true) this.colimage=false
  //     else this.colimage=true
  //     console.log(this.colimage);
      
  //     return this.colimage
  //   }
  //   if(name=='name')
  //   {
  //     if(this.colname==true) this.colname=false
  //     else this.colname=true
  //     return this.colname
  //   }
  //   if(name=='mobile')
  //   {
  //     if(this.colmobile==true) this.colmobile=false
  //     else this.colmobile=true
  //     return this.colmobile
  //   }
  //   if(name=='email')
  //   {
  //     if(this.colemail==true) this.colemail=false
  //     else this.colemail=true
  //     return this.colemail
  //   }
  //   if(name=='gender')
  //   {
  //     if(this.colgender==true) this.colgender=false
  //     else this.colgender=true
  //     return this.colgender
  //   }
  //   if(name=='dob')
  //   {
  //     if(this.colbirthdate==true) this.colbirthdate=false
  //     else this.colbirthdate=true
  //     return this.colbirthdate
  //   }
  //   return false
  // }
  onApply(){
    const value = this.filterForm.value
    this.deshboard.sortdata(value['sortby'],value['sortwith']).subscribe(res=>{
      this.userlist=res
      console.log(res);
    })
    // this.refreash()
  }
  getpagedata(pagerdata:any){
    this.isSelected=pagerdata
    this.deshboard.getpage(pagerdata*3).subscribe(res=>{
      this.userlist=res
    })
  }
  pageActive(item:any){
    return this.isSelected==item
  }
  refreash(){
  //   this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/home']);
  // }); 
  this.deshboard.getallUserlist().subscribe(res=>{
    var list=res
    this.paggerno=Math.ceil([...list].length/3)
    console.log([...list].length);
    console.log([...list].length/3);
    console.log(this.paggerno);
    this.fakearray=new Array(this.paggerno)
  })
  }
  onLogout() {
    localStorage.clear()
    this.router.navigate([''])
  }
  onCreate() {
    this.dialog.open(DialogAdduserComponent).afterClosed().subscribe(res=>{
      this.deshboard.getUserlist().subscribe(res => {
        this.userlist = res
        this.refreash()
      })
    })
  }
  submitdata(massege: any, close: any, classname: any) {
    this.deshboard.isUpdate=false
    const value = this.userForm.value
    let formData = new FormData()
    formData.append('name', value['name'])
    formData.append('email', value['email'])
    formData.append('gender', value['gender'])
    formData.append('mobileno', value['mobileno'])
    formData.append('dob', value['dob'])
    formData.append('file', this.image)
    console.log(value)

    this.deshboard.AddUserlist(formData)
      .subscribe((res) => {
        this.snackBar.open(massege, close, {
          duration: 2000,
          panelClass: [classname]
        });

        this.deshboard.getUserlist().subscribe(res => {
          this.userlist = res
        })
        this.refreash()
        this.clear()
      })
  }
  clear() {
    this.userForm.reset()
    this.image = ''
    // this.imageSrc = ''
  }
  open(user: any) {
    this.deshboard.userData = user
    // this.deshboard.isUpdate=true;
    // this.imageSrc = "http://localhost:3000/" + this.userData.file[0].path
    // this.isUpdate = true
    this.dialog.open(DialogAdduserComponent).afterClosed().subscribe(res=>{
      this.deshboard.getUserlist().subscribe(res => {
        this.userlist = res
      })
    })
  }
  onDelete(id:any){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deshboard.DeleteUserlist(id).subscribe(res=>{
          this.snackBar.open('Deleted','close', {
            duration: 2000,
            panelClass: ['success']
          });
          this.deshboard.getUserlist().subscribe(res => {
            this.userlist = res
          })
          this.refreash()
        })
      }
    })
    
  }
}
