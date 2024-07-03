import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShowToasterService {

  constructor(private toaster: ToastrService) { }

  showErrorMessage(message: string) {
    this.toaster.clear();
    this.toaster.error(message);
  }

  showSuccessMessage(message: string) {
    this.toaster.clear();
    this.toaster.success(message);
  }
}
