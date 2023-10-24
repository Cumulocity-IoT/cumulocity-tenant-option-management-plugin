import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  templateUrl: './add-option-modal.component.html',
})
export class AddOptionModalComponent {
  closeSubject: Subject<ITenantOption> = new Subject();

  option = {
    key: '',
    category: '',
    value: '',
    encrypted: '0',
  };

  constructor(private modal: BsModalRef) {}

  save() {
    if (this.option.encrypted === '1' && !this.option.key.includes('credentials')) {
      this.option.key = `credentials.${this.option.key}`;
    }
    this.closeSubject.next(this.option);
    this.modal.hide();
  }

  close() {
    this.closeSubject.next(null);
    this.modal.hide();
  }
}
