import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Import } from '../models/import.model';

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private apiUrl = `${environment.apiUrl}/imports`;

  constructor(private http: HttpClient) {}

  uploadCsv(file: File): Observable<Import> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Import>(this.apiUrl, formData);
  }
}
