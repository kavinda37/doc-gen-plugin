# Document Generator Plugin

This is a simple text processor plugin to create documents, invoices, bills and emails etc. this library will resolve params and inject data inside strings/html on runtime

*This project is in pre-alpha stages and not available in npm yet!!

## Features (Current version)
- String resolver service (`#:TYPE:value:#`) - This is a base of text processor library which will inject params with resolved data.
- Math resolver service (`:math{}:`) - this will support all the arithmetic functions which is defined inside the notation (eg: `:math{2+3}:` = 5, `:math{sum(2,3)}:`= 5)
- Most of the arithmetic functions in excel will be supported in `:math{}:` notation (i.e sum() , sub(), sqrt() etc) powered by math.js (https://mathjs.org/docs/index.html)
- Text processor lib is integrated in to TinyMce 5 rather than using a simple textarea.
- this will help to easily generate HTML or texts with more available word like features and styling when designing documents  

## Future Plan and Roadmap
- Barcode and QR code support
- Objects and array supports (Auto generated tables for Objects and arrays)
- Dynamic image support
- Custom Expression support (if, else, and, or support inside documents)
- Backend resolver of the text processor
- Multiple Document support with CRUD and unique code for easy integration
- Multiple document list and API for user to save multiple documents and use those
- Api binding SDK to use in text processor
- Api binding SDK will give user the more flexibility to add their own apis and use those inside text processor
- TinyMce 6 Support
- convert Text processor library in _liberary folder to an actual library project and published to npm 
- Multiple API list and define key elements of api to be used in text processor this will help users to add multiple apis and use those in documents
- text processor lib/component code and metadata support

## Setup and Usage (planned)
- Login to :web-site: or self host the designer plugin.
- Generate a document or text using the editor provided.
- `Hello #API:firstName:#! Today is #API:day:#. tomorrow is :math{#API:day:#+1}:`
- Once saved, a code will be generated (i.e: `ere23er4w5t3sd5432dwef`)
- `npm i text-processor-lib-name@^1.0.0`
- Pass the code into text processor component with data
- `<text-processor code="ere23er4w5t3sd5432dwef" [values$]="val$"></text-processor>`
- values$ accept a data stream, which contains a data object in { key:value } format
- sending the following data `val = { firstName:'John', day:18 }` will output `Hello John! Today is 18. tomorrow is 19`


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
