import { Injectable } from '@angular/core';
import { IManagedObject, ITenantOption, InventoryService, TenantOptionsService } from '@c8y/client';
import { TenantOptionRow } from './tenant-option-management.component';

export interface TenantOptionConfiguration extends IManagedObject {
  type: 'tenant_option_plugin_config';
  options: ITenantOption[];
}
@Injectable()
export class TenantOptionManagementService {
  constructor(private inventory: InventoryService, private tenantOption: TenantOptionsService) {}

  async getConfiguration(): Promise<TenantOptionConfiguration> {
    const { data } = await this.inventory.list({
      pageSize: 1,
      type: 'tenant_option_plugin_config',
      withTotalPages: false,
      withChildren: false,
    });

    if (data.length) {
      return data[0] as TenantOptionConfiguration;
    } else {
      return (
        await this.inventory.create({
          type: 'tenant_option_plugin_config',
          options: [],
        })
      ).data as TenantOptionConfiguration;
    }
  }

  async addOption(option: ITenantOption) {
    await this.tenantOption.create(option);
    delete option.value;

    const config = await this.getConfiguration();

    config.options.push(option);

    return this.inventory.update({ id: config.id, options: config.options });
  }

  updateOption(option: ITenantOption) {
    return this.tenantOption.update(option);
  }

  getAllOptions() {
    return this.tenantOption
      .list({
        pageSize: 2000,
      })
      .then((res) => res.data.map((o) => ({ id: `${o.category}-${o.key}`, value: o.value })));
  }

  async deleteOption(row: TenantOptionRow) {
    await this.tenantOption.delete(row);
    const config = await this.getConfiguration();
    const delta = {
      id: config.id,
      options: config.options.filter((o) => o.category !== row.category && o.key !== row.category),
    };
    await this.inventory.update(delta);
  }
}
