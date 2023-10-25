import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import {
  ActionControl,
  BuiltInActionType,
  Column,
  ColumnDataType,
  ModalService,
  Pagination,
  Status,
  _,
} from '@c8y/ngx-components';
import { TenantOptionManagementService } from './tenant-option-management.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddOptionModalComponent } from './add-option/add-option-modal.component';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export interface TenantOptionRow extends ITenantOption {
  id: string;
}
@Component({
  templateUrl: './tenant-option-management.component.html',
  styleUrls: ['./tenant-option-management.component.less'],
})
export class TenantOptionManagementComponent {
  columns: Column[];
  rows: TenantOptionRow[];

  pagination: Pagination = {
    pageSize: 30,
    currentPage: 1,
  };

  actionControls: ActionControl[] = [
    {
      type: BuiltInActionType.Edit,
      callback: (row: TenantOptionRow) => this.onEditRow(row),
    },
    {
      type: BuiltInActionType.Delete,
      callback: (row: TenantOptionRow) => void this.onDeleteRow(row),
    },
  ];

  constructor(
    private optionsManagement: TenantOptionManagementService,
    private bsModalService: BsModalService,
    protected modal: ModalService,
    protected translateService: TranslateService
  ) {
    this.columns = this.getDefaultColumns();
    this.reload();
  }

  reload() {
    void this.optionsManagement
      .getConfiguration()
      .then(
        (config) =>
          (this.rows = config.options.map((o) => ({ id: `${o.category}-${o.key}`, ...o }))),
        () => (this.rows = [])
      )
      .then(() => this.optionsManagement.getAllOptions())
      .then((allOptions) =>
        this.rows.forEach((r) => (r.value = allOptions.find((o) => o.id === r.id)?.value))
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

  openModal(row?: TenantOptionRow) {
    const modalRef = this.bsModalService.show(AddOptionModalComponent, {});
    modalRef.content.ids = this.rows.map((r) => r.id);
    if (row) {
      modalRef.content.setOption(row);
    }
    modalRef.content.closeSubject.pipe(take(1)).subscribe((option) => {
      if (option) {
        if (row) {
          void this.optionsManagement.updateOption(option).then(() => this.reload());
        } else {
          void this.optionsManagement.addOption(option).then(() => this.reload());
        }
      }
    });
  }

  onEditRow(row: TenantOptionRow): void {
    this.openModal(row);
  }

  async onDeleteRow(row: TenantOptionRow) {
    await this.modal.confirm(
      _('Delete Tenant Option') as string,
      this.translateService.instant(
        _(
          `You are about to delete Tenant Option with Category "{{ category }}" and Key "{{ key }}". Do you want to proceed?`
        ) as string,
        { category: row.category, key: row.key }
      ) as string,
      Status.DANGER,
      { ok: _('Delete') as string, cancel: _('Cancel') as string }
    );
    await this.optionsManagement.deleteOption(row);
    this.rows = this.rows.filter((r) => r.category !== row.category && r.key !== row.key);
    // reload the grid to remove the just deleted item
    // this.refresh.next();
  }
}
