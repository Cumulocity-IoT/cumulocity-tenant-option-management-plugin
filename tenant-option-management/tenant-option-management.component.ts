import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import { Column, ColumnDataType, Pagination } from '@c8y/ngx-components';
import { TenantOptionManagementService } from './tenant-option-management.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddOptionModalComponent } from './add-option/add-option-modal.component';
import { take } from 'rxjs/operators';

export interface TenantOptionRow extends ITenantOption {
  id: string;
}
@Component({
  templateUrl: './tenant-option-management.component.html',
})
export class TenantOptionManagementComponent {
  columns: Column[];
  rows: TenantOptionRow[];

  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1,
  };

  constructor(
    private optionsManagement: TenantOptionManagementService,
    private bsModalService: BsModalService
  ) {
    this.columns = this.getDefaultColumns();
    void this.optionsManagement.getConfiguration().then(
      (config) => (this.rows = config.options.map((o) => ({ id: `${o.category}-${o.key}`, ...o }))),
      () => (this.rows = [])
    );
  }

  getDefaultColumns(): Column[] {
    return [
      {
        header: 'Category',
        name: 'category',
        path: 'category',
        filterable: true,
        dataType: ColumnDataType.TextShort,
      },
      {
        header: 'Key',
        name: 'key',
        path: 'key',
        filterable: true,
        dataType: ColumnDataType.TextShort,
      },
      {
        header: 'Content',
        name: 'content',
        path: 'value',
        filterable: true,
        dataType: ColumnDataType.TextLong,
      },
    ];
  }

  openModal() {
    const modalRef = this.bsModalService.show(AddOptionModalComponent, {});

    modalRef.content.closeSubject.pipe(take(1)).subscribe((option) => {
      if (option) {
        void this.optionsManagement.addOption(option);
      }
    });
  }
}
