import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { TenantOptionManagementService } from '../tenant-option-management.service';

@Component({
  templateUrl: './import-option-modal.component.html',
})
export class ImportOptionModalComponent {
  closeSubject: Subject<(ITenantOption & { encrypted: string }) | null> = new Subject();

  option: ITenantOption = {
    key: '',
    category: '',
  };

  isLoading = false;

  constructor(
    private tenantOptionMgmt: TenantOptionManagementService,
    private alert: AlertService,
    private modal: BsModalRef
  ) {}

  import() {
    this.isLoading = true;
    this.tenantOptionMgmt
      .importOption(this.option)
      .then(
        (option) => {
          this.closeSubject.next(option);
          this.modal.hide();
        },
        (error) => {
          this.alert.danger('Option could not be imported', JSON.stringify(error));
        }
      )
      .finally(() => (this.isLoading = false));
  }

  close() {
    this.closeSubject.next(null);
    this.modal.hide();
  }
}
