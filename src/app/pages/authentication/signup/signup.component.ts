import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core';
import { finalize } from 'rxjs/operators';
import { EmailValidation } from '@app/core/validators/email-validation';
import { PhoneValidation } from '@app/core/validators/phone-validation';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;
	isLoading = false;

	constructor(
		public router: Router,
		private formBuilder: FormBuilder,
		private authenticationService: AuthenticationService
	) {
		this.createForm();
	}

	ngOnInit() {}

	signup() {
		this.isLoading = true;
		this.authenticationService
			.signup(this.signupForm.value)
			.pipe(
				finalize(() => {
					this.signupForm.markAsPristine();
					this.isLoading = false;
				})
			)
			.subscribe(
				(user: Authentication.User) => {
					console.log(user);
					this.router.navigate(['/login']);
				},
				(error: any) => {
					console.log('Signup error: ', error);
				}
			);
	}

	private createForm() {
		this.signupForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', [Validators.required]],
			email: ['', [Validators.required, EmailValidation.emailValidation]],
			phone: ['', [Validators.required, PhoneValidation.phoneValidation]],
			password: ['', Validators.required],
			cPassword: ['', Validators.required]
		});
	}
}
