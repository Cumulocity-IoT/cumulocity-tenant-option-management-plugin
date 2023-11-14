import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import { AlertService } from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { TenantOptionManagementService } from '../tenant-option-management.service';
import { TenantOptionRow } from '../../tenant-option-management/tenant-option-management.component';

@Component({
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent {
  closeSubject: Subject<(ITenantOption & { encrypted: string }) | null> = new Subject();

  rows: TenantOptionRow[];

  isLoading = false;

  constructor(
    private tenantOptionMgmt: TenantOptionManagementService,
    private alert: AlertService,
    private modal: BsModalRef
  ) { }

  export() {
    this.isLoading = true;
    console.log(this.rows)
    this.isLoading = false;
  }

  close() {
    this.closeSubject.next(null);
    this.modal.hide();
  }
}
