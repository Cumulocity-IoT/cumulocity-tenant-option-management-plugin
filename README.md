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

You can only see, edit and delete options you created using the plugin. (You can add existing tenant options using the import button.)

## Features to come

-	(Bulk) Import and export of all options/ specific categories
-	Import by Template
o	dynamically show creation forms for c8y specific tenant options using formly
o	will ship with example template for Analytics Builder options
## Versions
1.0.x - compatible with UI v. 1017
In the future: 2.0.x - compatible with UI v. 1018

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

## Useful links 

📘 Explore the Knowledge Base   
Dive into a wealth of Cumulocity IoT tutorials and articles in our [Tech Community Knowledge Base](https://tech.forums.softwareag.com/tags/c/knowledge-base/6/cumulocity-iot).   

💡 Get Expert Answers    
Stuck or just curious? Ask the Cumulocity IoT experts directly on our [Forum](https://tech.forums.softwareag.com/tags/c/forum/1/Cumulocity-IoT).   

🚀 Try Cumulocity IoT    
See Cumulocity IoT in action with a [Free Trial](https://techcommunity.softwareag.com/en_en/downloads.html).   

✍️ Share Your Feedback    
Your input drives our innovation. If you find a bug, please create an issue in the repository. If you’d like to share your ideas or feedback, please post them [here](https://tech.forums.softwareag.com/c/feedback/2). 

More to discover
* [How to install a Microfrontend Plugin on a tenant and use it in an app?](https://tech.forums.softwareag.com/t/how-to-install-a-microfrontend-plugin-on-a-tenant-and-use-it-in-an-app/268981)  
* [Cumulocity IoT Web Development Tutorial - Part 1: Start your journey](https://tech.forums.softwareag.com/t/cumulocity-iot-web-development-tutorial-part-1-start-your-journey/259613) 
* [The power of micro frontends – How to dynamically extend Cumulocity IoT Frontends](https://tech.forums.softwareag.com/t/the-power-of-micro-frontends-how-to-dynamically-extend-cumulocity-iot-frontends/266665)  

----
These tools are provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
