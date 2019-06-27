import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private appSharedService: AppSharedService,
    private formBuilder: FormBuilder,
    private loginService: LoginService) { }

  @HostListener('document:keyup.enter', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.onLogin();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
     if (this.loginForm.valid) {
       const obj = this.loginForm.value;
       this.loginService.login(obj).subscribe((res) => {
         console.log(res);
         if(res) {
           this.appSharedService.setUserLoggedIn(true);
           this.router.navigate(['/dms/dashboard']);
         }

       }, (err) => {
         console.log(err);

       });
     }
  }

}
