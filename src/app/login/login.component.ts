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
  submitted = false;
  invalid_auth = false;
  loginObj: any = { userName: null, password: null }

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
  get f() { return this.loginForm.controls; }
  onLogin() {
    
    
    this.submitted = true;
     if (this.loginForm.valid) {
      const obj = this.loginForm.value;
      this.loginService.login(obj).subscribe((res) => {
        console.log(res);
        if(res) {
          this.appSharedService.setUserLoggedIn(true);
          this.router.navigate(['/dms/dashboard']);
        } else {
          this.invalid_auth = true;
        }

      }, (err) => {
        this.invalid_auth = true;
        console.log(err);

      });
    }
    // this.appSharedService.setUserLoggedIn(true);
    // this.router.navigate(['/dms/dashboard']);
  }

}
