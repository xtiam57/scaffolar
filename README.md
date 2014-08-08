Scaffolar
=========

The AngularJS' scaffolding tool for single page websites.
> Compile Sass to CSS with [Ruby Sass](http://sass-lang.com/install)

> Also, you can use [Compass](http://compass-style.org/)

This project is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.

Scaffolar contains a sample AngularJS application and is preconfigured to install the Angular framework and a bunch of development and testing tools for instant web development gratification.

Scaffolar doesn't do much, just shows how to wire two controllers and views together.

## Getting Started

To get you started you can simply clone the Scaffolar repository and install the dependencies:

### Prerequisites

You need git to clone the angular-seed repository. You can get it from
[http://git-scm.com/](http://git-scm.com/).

We also use a number of node.js tools to initialize and test angular-seed. You must have node.js and
its package manager (npm) installed.  You can get them from [http://nodejs.org/](http://nodejs.org/).

### Install

Clone the angular-seed repository using [git][git]:

```sh
$ git clone https://github.com/angular/angular-seed.git
$ cd angular-seed
```
Then run:

```sh
$ npm install
```

## Serve

```sh
$ gulp
```

## Build

```sh
$ gulp build
```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
scaffolar/
├── dist/
│   ├── css/
│   │   ├── style.css
│   │   ├── vendors.css
│   ├── js/
│   │   ├── angularjs/
│   │   │   ├── angular-sanitize.min.js
│   │   │   ├── angular-ui-router.min.js
│   │   │   ├── angular.min.js
│   │   │   ├── restangular.min.js
│   │   │   ├── ui-bootstrap.min.js
│   │   ├── jquery/
│   │   │   ├── jquery.min.js
│   │   ├── moment/
│   │   │   ├── moment.min.js
│   │   ├── underscore/
│   │   │   ├── underscore.min.js
│   │   ├── app.js
├── src/
│   ├── bootstrap.css
│   ├── bootstrap.min.css
│   ├── bootstrap-theme.css
│   └── bootstrap-theme.min.css
└── .editorconfig
└── .gitignore
└── gulpfile.js
└── LICENSE
└── package.json
└── README.md
```

## Creator

**Christiam Mena**

- <http://twitter.com/xtiam57>
- <http://github.com/xtiam57>
