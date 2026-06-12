import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ChangePasswordFormValue } from '../../types/security.types';
import { SecurityApiService } from '../../services/security-api.service';

const passwordsMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    return { passwordsMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-change-password',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly securityApi = inject(SecurityApiService);
  private readonly snackBar = inject(MatSnackBar);

  readonly submitting = signal(false);
  readonly successMessage = signal<string | null>(null);

  readonly form = this.fb.nonNullable.group(
    {
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordsMatchValidator },
  );

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue() as ChangePasswordFormValue;
    this.submitting.set(true);
    this.successMessage.set(null);

    this.securityApi
      .changePassword({
        currentPassword: value.currentPassword,
        newPassword: value.newPassword,
      })
      .subscribe({
        next: (response) => {
          this.successMessage.set(response.data.message);
          this.snackBar.open(response.data.message, 'OK', { duration: 4000 });
          this.form.reset();
        },
        error: () => {
          this.submitting.set(false);
        },
        complete: () => {
          this.submitting.set(false);
        },
      });
  }
}
