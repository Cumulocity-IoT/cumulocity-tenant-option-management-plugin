# Cumulocity IoT Tenant Option Management plugin

Easily create, edit and delete tenant options. You can configure an option as encrypted and can decided between text or JSON input.

## Sample images

List all tenant options that were created on the tenant. You can search through, sort and filter all columns.
![alt Tenant options grid example](/docs/overview.png)

Easily create text or JSON options. You can also encrypt the content of an option.
![alt Create tenant option example](/docs/create-option.png)

JSON editor example
![alt Update of a tenant option with JSOn value example](/docs/update-json-option.png)

## Limitations

You can only see, edit and delete options you created using the plugin.

## Features to come

-	(Bulk) Import and export of all options/ specific categories
-	Import by Template
o	dynamically show creation forms for c8y specific tenant options using formly
o	will ship with example template for Analytics Builder options

## Versions
1.0.0 - WebSDK v. 1017

**How to start**
Change the target tenant and application you want to run this plugin on in the `package.json`.

```
c8ycli server -u https://{{your-tenant}}.cumulocity.com/ --shell {{administration}}
```
Keep in mind that this plugin needs to have an app (e.g. cockpit) running with at least the same version as this plugin. if your tenant contains an older version, use the c8ycli to create a cockpit clone running with at least v 1017! Upload this clone to the target tenant and reference this name in the --shell command.

The widget plugin can be locally tested via the start script:

```
npm start
```

In the Module Federation terminology, `widget` plugin is called `remote` and the `cokpit` is called `shell`. Modules provided by this `widget` will be loaded by the `cockpit` application at the runtime. This plugin provides a basic custom widget that can be accessed through the `Add widget` menu.

> Note that the `--shell` flag creates a proxy to the cockpit application and provides` WidgetPluginModule` as an `remote` via URL options.

Also deploying needs no special handling and can be simply done via `npm run deploy`. As soon as the application has exports it will be uploaded as a plugin.
