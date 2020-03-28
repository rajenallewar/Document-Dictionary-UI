import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppSharedService } from '../shared/services/shared.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private appSharedService: AppSharedService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  @HostListener('document:keyup.enter', ['$event']) onKeyupHandler(event: KeyboardEvent) {
    this.onLogin();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.appSharedService.getUserLoggedIn()) {
      this.appSharedService.setUserLoggedIn(true);
      this.router.navigate(['/dms/dashboard']);
    }
  }
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const obj = this.loginForm.value;
      this.loginService.login(obj).subscribe((res: any) => {
        console.log(res);
        if (res.authenticated === true && res.entitlements.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(res));
          const expiredDate = new Date();
          // expiredDate.setTime(expiredDate.getTime() + (30 * 1000)); // for 30 secs
          expiredDate.setDate(expiredDate.getDate() + 1); // for 1 day
          const expires = 'expires=' + expiredDate.toUTCString();
          // document.cookie = JSON.stringify(res);
          document.cookie = JSON.stringify(res) + ';' + expires + ';path=/dms';
          this.appSharedService.setUserLoggedIn(true);
          this.router.navigate(['/dms/dashboard']);
        } else if (res.authenticated === true && res.entitlements.length == 0) {
          this.toastr.error('User does not have requied access to this application.', '', this.appSharedService.toastrOption);
        } else {
          this.toastr.error('Invalid User Name/Password', '', this.appSharedService.toastrOption);
        }

      }, (err) => {
        console.log(err);

      });
    }
  }

}
