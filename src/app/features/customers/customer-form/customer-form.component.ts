import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { Customer } from '../../../core/models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  customerId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      document: ['', Validators.required]
    });

    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEditMode = !!this.customerId;

    if (this.isEditMode) {
      this.loadCustomer();
    }
  }

  get f() {
    return this.customerForm.controls;
  }

  loadCustomer(): void {
    if (!this.customerId) return;

    this.loading = true;
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer: Customer) => {
        this.customerForm.patchValue({
          full_name: customer.full_name,
          email: customer.email,
          phone: customer.phone || '',
          document: customer.document || ''
        });
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load customer';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const request$ = this.isEditMode
      ? this.customerService.updateCustomer(this.customerId!, this.customerForm.value)
      : this.customerService.createCustomer(this.customerForm.value);

    request$.subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (error) => {
        this.error = this.isEditMode ? 'Failed to update customer' : 'Failed to create customer';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
