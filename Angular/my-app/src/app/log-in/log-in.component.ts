import { Component } from '@angular/core';
import { APICallService } from '../../Services/APICall/apicall.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ShowToasterService } from '../../Services/show-toaster.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
})
export class LogInComponent {
  logInForm!: FormGroup;

  constructor(private apiCallService: APICallService, private router: Router, private toaster: ShowToasterService) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  fromSubmit() {
    if (this.logInForm.valid) {
      this.apiCallService.LogIn(this.logInForm.value).subscribe((response) => {
        this.toaster.showSuccessMessage("Log In Successfully.");
        localStorage.setItem('jwtToken', response.result.jwtToken);
        this.router.navigate(['/Food']);
      });
    }
    else {
      this.logInForm.markAllAsTouched();
    }
  }
}
