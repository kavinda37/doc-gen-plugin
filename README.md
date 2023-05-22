# Document Generator Plugin

This is a simple text processor plugin to create documents, invoices, bills and emails etc. this liberary will resolve params and inject data inside strings/html on runtime

*This project is in pre-alpha stages

# Features (Current version)
- String resolver service (`#:TYPE:value:#`) - This is a base of text prosessor liberary which will inject params with resolved data.
- Math resolver service (`:math{}:`) - this will support all the arithmatic functions which is defined inside the notation (eg: `:math{2+3}:` will resolve 5 ) 


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
