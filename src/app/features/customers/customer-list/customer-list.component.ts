import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
    selector: 'app-customer-list',
    imports: [RouterModule],
    templateUrl: './customer-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  loading = false;
  error = '';
  deleteConfirm: number | null = null;

  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.loading = true;
    this.error = '';

    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customers';
        this.loading = false;
      }
    });
  }

  editCustomer(id: number): void {
    this.router.navigate(['/customers', id, 'edit']);
  }

  confirmDelete(id: number): void {
    this.deleteConfirm = id;
  }

  cancelDelete(): void {
    this.deleteConfirm = null;
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe({
      next: () => {
        this.customers = this.customers.filter(c => c.id !== id);
        this.deleteConfirm = null;
      },
      error: (error) => {
        this.error = 'Failed to delete customer';
        this.deleteConfirm = null;
      }
    });
  }
}
