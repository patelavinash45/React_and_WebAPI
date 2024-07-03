import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { APICallService } from '../../../Services/APICall/apicall.service';
import { Router, RouterModule } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css',
})
export class DeleteModalComponent {
  @Input() foodId!: number;

  constructor(private apiCallService: APICallService, private router: Router) { }

  conformDelete() {
    $('#exampleModal').modal('hide');
    this.apiCallService.DeleteFoodItem(this.foodId).subscribe(() => {
      this.router.navigate(['/Food']);
    });
  }
}
