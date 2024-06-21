import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { APICallService } from '../../../APICall/apicall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Input() foodId!: number;

  constructor(private apiCallService: APICallService, private router: Router) {}

  conformDelete() {
    this.apiCallService.DeleteFoodItem(this.foodId).subscribe(() => {
      this.router.navigate(['/Food']);
    }); 
  }
}
