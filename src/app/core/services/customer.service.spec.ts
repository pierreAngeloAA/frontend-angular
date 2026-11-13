import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { CustomerService } from './customer.service';
import { ImportService } from './import.service';
import { environment } from '../../../environments/environment';

describe('CustomerService and ImportService', () => {
  let http: HttpTestingController;
  const url = `${environment.apiUrl}/customers`;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('maps each operation to the REST endpoint', () => {
    const customers = TestBed.inject(CustomerService);
    const data = { document: '1', full_name: 'Ana', email: 'a@b.com', phone: '' };

    customers.getCustomers().subscribe();
    customers.getCustomer(7).subscribe();
    customers.createCustomer(data).subscribe();
    customers.updateCustomer(7, data).subscribe();
    customers.deleteCustomer(7).subscribe();

    expect(http.expectOne({ method: 'GET', url }).request).toBeTruthy();
    expect(http.expectOne({ method: 'GET', url: `${url}/7` }).request).toBeTruthy();
    expect(http.expectOne({ method: 'POST', url }).request.body).toEqual(data);
    expect(http.expectOne({ method: 'PUT', url: `${url}/7` }).request.body).toEqual(data);
    expect(http.expectOne({ method: 'DELETE', url: `${url}/7` }).request).toBeTruthy();
  });

  it('uploads the CSV as multipart form data', () => {
    const file = new File(['document,full_name\n'], 'customers.csv', { type: 'text/csv' });

    TestBed.inject(ImportService).uploadCsv(file).subscribe();

    const body = http.expectOne({ method: 'POST', url: `${environment.apiUrl}/imports` }).request.body as FormData;
    expect(body.get('file')).toEqual(file);
  });
});
