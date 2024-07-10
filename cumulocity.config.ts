import type { ConfigurationOptions } from '@c8y/devkit';
import { author, description, version } from './package.json';

export default {
  runTime: {
    author,
    description,
    version,
    name: 'Tenant Option Management Plugin',
    contentSecurityPolicy:
      "base-uri 'none'; default-src 'self' 'unsafe-inline' http: https: ws: wss:; connect-src 'self' http: https: ws: wss:;  script-src 'self' *.bugherd.com *.twitter.com *.twimg.com *.aptrinsic.com 'unsafe-inline' 'unsafe-eval' data:; style-src * 'unsafe-inline' blob:; img-src * data: blob:; font-src * data:; frame-src *; worker-src 'self' blob:;",
    dynamicOptionsUrl: true,
    remotes: {
      'widget-plugin': ['TenantOptionManagementModule']
    },
    package: 'plugin',
    isPackage: true,
    noAppSwitcher: true,
    webSdkVersion: "1020.0.19",
    exports: [
      {
        name: "Tenant option plugin",
        module: "TenantOptionManagementModule",
        path: "./src/app/tenant-option-management/tenant-option-management.module.ts",
        description: "Adds menu entry. Users can add/update/delete tenant options."
    }
    ]
  },
  buildTime: {
    federation: [
      '@angular/animations',
      '@angular/cdk',
      '@angular/common',
      '@angular/compiler',
      '@angular/core',
      '@angular/forms',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      '@angular/upgrade',
      '@c8y/client',
      '@c8y/ngx-components',
      'ngx-bootstrap',
      '@ngx-translate/core',
      '@ngx-formly/core'
    ]
  }
} as const satisfies ConfigurationOptions;
