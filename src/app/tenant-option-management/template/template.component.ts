import { Component } from '@angular/core';
import analyticsBuilderJson from './analytics-builder-example.json';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'tenant-option-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {
  form = new FormGroup({});
  fields: FormlyFieldConfig[] = analyticsBuilderJson;
  model: any = {};
}
