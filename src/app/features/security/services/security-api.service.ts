import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/types/api.types';
import { ChangePasswordPayload, ChangePasswordResponse } from '../types/security.types';

@Injectable({ providedIn: 'root' })
export class SecurityApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/security`;

  changePassword(payload: ChangePasswordPayload): Observable<ApiResponse<ChangePasswordResponse>> {
    return this.http.post<ApiResponse<ChangePasswordResponse>>(
      `${this.baseUrl}/change-password`,
      payload,
    );
  }
}
