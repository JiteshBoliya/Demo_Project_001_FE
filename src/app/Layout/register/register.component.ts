import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GoogleGapiService } from '../../shared/service/google-gapi.service';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/shared/service/auth.guard';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public RegistrationForm !: FormGroup;
  public LoginForm !: FormGroup;
  container:any = document.getElementById('container')
  constructor(private router: Router,
              private signinservice: GoogleGapiService, 
              private ref: ChangeDetectorRef,
              private authservice: AuthService, 
          private authguard: AuthGuard,
          private snackBar: MatSnackBar,
          // private socialAuthService: SocialAuthService
          ) { }

  ngOnInit(): void {
    this.container = document.getElementById('container')

    this.RegistrationForm = new FormGroup({
      username: new FormControl("",Validators.required),
      email: new FormControl("", [Validators.required,Validators.email]),
      password: new FormControl("", Validators.required),
    })
    this.LoginForm = new FormGroup({
      email: new FormControl("", [Validators.required,Validators.email]),
      password: new FormControl("", Validators.required),
    })
    this.authguard.canActivate()
    this.authservice.authoLogin()
  }
signUpButton(){this.container.classList.add("right-panel-active")}
signInButton(){this.container.classList.remove("right-panel-active")}

OnGoogleLogin(){
    this.signinservice.signin().then((res) => {
      this.authservice.userLogin(res).subscribe(
        res => {
          this.authservice.updateUser(res.user)
          this.authservice.userId=res.user
          localStorage.setItem('userid', res.user._id)
          localStorage.setItem('userData', res.user.token)
          this.router.navigate(['/home'])
        })
    })
}

OnLoginNev(){this.router.navigate(['/home'])}
OnRegisterNev(){this.router.navigate(['/home'])}
 
onLoginbtn(){
  const formData = new FormData()
    formData.append('email', this.LoginForm.get('email')?.value)
    formData.append('password', this.LoginForm.get('password')?.value)
    
    this.authservice.LoginManual(formData).subscribe(res => {
          localStorage.setItem('userid', res.user._id)
          localStorage.setItem('userData', res.user.token)
          this.router.navigate(['/home'])
      },
      err=>{
        this.snackBar.open('Login failed','close', {
          duration: 2000,
          panelClass: ['failed']
        });
      }
    )
}
OnRegister(){
  const formData = new FormData()
    formData.append('username', this.RegistrationForm.get('username')?.value)
    formData.append('email', this.RegistrationForm.get('email')?.value)
    formData.append('password', this.RegistrationForm.get('password')?.value)
    this.authservice.RegisterManual(formData).subscribe(res => {
          this.RegistrationForm.reset()
          this.signInButton()
      }
    )
}
loginWithFacebook(): void {
  // this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
}
loginTwitter(){
  this.authservice.twitterLogin().subscribe(res=>{
    console.log(res);
  })
}
}
