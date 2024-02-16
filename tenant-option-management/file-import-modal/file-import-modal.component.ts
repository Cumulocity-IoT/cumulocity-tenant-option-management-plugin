import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import {
  AlertService,
  Column,
  ColumnDataType,
  DisplayOptions,
  Pagination,
} from '@c8y/ngx-components';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { TenantOptionRow } from '../tenant-option-management.component';

@Component({
  templateUrl: './file-import-modal.component.html',
})
export class FileImportModalComponent {
  closeSubject: Subject<(ITenantOption & { encrypted: string }) | null> = new Subject();

  columns: Column[] = [];
  rows: TenantOptionRow[] = [];
  selectedItems: TenantOptionRow[] = [];

  displayOptions: DisplayOptions = {
    bordered: false,
    gridHeader: true,
    striped: false,
    filter: false,
  };

  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1,
  };

  selectable = true;

  isLoading = false;

  title = 'Tenant Options Export';

  constructor(private modal: BsModalRef, private alertService: AlertService) {
    this.columns = this.getDefaultColumns();
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
    ];
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file && file.type === 'application/json') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          const fileContent = e.target.result;
          this.rows = JSON.parse(fileContent);
        } catch (error) {
          this.alertService.danger('Invalid file content. Please select a valid JSON file.');
          console.warn(error);
        }
      };

      reader.readAsText(file);
    } else {
      this.alertService.danger('Invalid file type. Please select a JSON file.');
      console.log('Invalid file type. Please select a JSON file.');
    }
  }

  onItemsSelect(selectedItemIds: string[]) {
    this.selectedItems = this.rows.filter((r) => selectedItemIds.includes(r.id));
  }

  reload() {}

  export() {
    this.isLoading = true;
    const selectedItemsJson = JSON.stringify(this.selectedItems);
    const blob = new Blob([selectedItemsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'export_tenant_options.json';
    link.click();
    this.isLoading = false;
  }

  close() {
    this.closeSubject.next(null);
    this.modal.hide();
  }
}
