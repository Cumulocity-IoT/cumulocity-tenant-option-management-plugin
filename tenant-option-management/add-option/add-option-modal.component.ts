import { Component } from '@angular/core';
import { ITenantOption } from '@c8y/client';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { TenantOptionRow } from 'tenant-option-management/tenant-option-management.component';

// TODO: add conflict detection!
interface Tab {
  id: 'text' | 'json';
  label: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
}

@Component({
  templateUrl: './add-option-modal.component.html',
  styleUrls: ['./add-option-modal.component.less'],
})
export class AddOptionModalComponent {
  closeSubject: Subject<ITenantOption & { encrypted: string }> = new Subject();

  option = {
    key: '',
    category: '',
    value: '',
    encrypted: '0',
  };

  tabs: Tab[] = [
    {
      id: 'text',
      label: 'Text',
      icon: 'text',
      active: true,
    },
    {
      id: 'json',
      label: 'JSON',
      icon: 'json',
      active: false,
    },
  ];

  currentTab: Tab['id'] = this.tabs.find((t) => t.active)?.id ?? this.tabs[0].id;

  jsonEditorData: object = {};
  jsonErrorMessage: string;
  isEditing = false;
  ids: string[];
  showConflictError = false;

  constructor(private modal: BsModalRef) {}

  setOption(row: TenantOptionRow) {
    this.isEditing = true;
    this.option = {
      category: row.category,
      key: row.key,
      encrypted: row.key.startsWith('credentials') ? '1' : '0',
      value: row.value,
    };
    let tabId: 'text' | 'json' = 'json';

    try {
      // boolean values and numberic values should be handled as text
      if (this.isBooleanValue(this.option.value) || this.isNumberValue(this.option.value)) {
        throw new Error('Not valid JSON!');
      }

      this.jsonEditorData = JSON.parse(this.option.value) as object;
    } catch (e) {
      tabId = 'text';
    }

    this.tabs.map((t) => {
      t.active = t.id === tabId;
    });
    this.currentTab = tabId;
  }

  changeTab(tabId: Tab['id']): void {
    this.tabs.map((t) => {
      t.active = t.id === tabId;
    });
    this.currentTab = tabId;
    this.option.value = '';

    delete this.jsonErrorMessage;
  }

  onJSONChange(text: string) {
    try {
      JSON.parse(text);
      this.option.value = text;
      this.jsonErrorMessage = '';
    } catch (e) {
      this.jsonErrorMessage = 'No valid JSON!';
    }
  }

  validateExistence() {
    if (!this.isEditing && this.option.category && this.option.key) {
      const id = `${this.option.category}-${this.option.key}`;
      this.showConflictError = this.ids.includes(id);
    }
  }

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

  private isBooleanValue(value: string): boolean {
    return ['true', 'false'].includes(value.toLowerCase());
  }

  private isNumberValue(value: string): boolean {
    return !isNaN(Number(value));
  }
}
