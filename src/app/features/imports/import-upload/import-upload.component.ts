import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { ImportService } from '../../../core/services/import.service';

@Component({
    selector: 'app-import-upload',
    imports: [RouterModule],
    templateUrl: './import-upload.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./import-upload.component.css']
})
export class ImportUploadComponent {
  loading = false;
  error = '';
  success = '';
  selectedFile: File | null = null;

  constructor(
    private importService: ImportService,
    private router: Router
  ) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];

      if (!file.name.endsWith('.csv')) {
        this.error = 'Please select a CSV file';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
      this.error = '';
    }
  }

  onUpload(): void {
    if (!this.selectedFile) {
      this.error = 'Please select a file';
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    this.importService.uploadCsv(this.selectedFile).subscribe({
      next: (importData) => {
        this.success = 'File uploaded successfully';
        this.loading = false;
        this.selectedFile = null;
        setTimeout(() => {
          this.router.navigate(['/custoemrs']);
        }, 1500);
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to upload file';
        this.loading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/imports']);
  }
}
