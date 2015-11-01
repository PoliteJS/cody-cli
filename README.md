Cody CLI
---

`Cody` is a command line utility designed to help web development at the beginning 
of the developer's career. `Cody` takes care of the environment and **let you focus on the code**.

[![Stories in Ready](https://badge.waffle.io/PoliteJS/cody-cli.svg?label=ready&title=Ready)](http://waffle.io/PoliteJS/cody-cli)
[![Backlog](https://badge.waffle.io/PoliteJS/cody-cli.svg?label=in%20progress&title=In Progress)](http://waffle.io/PoliteJS/cody-cli)

## Why?

> Setting up a simple server (_NIGIX_, _Apache_) it's a difficult business, setting > up _Grunt_ / _Gulp_ to transpile _LESS_ or _SASS_ is even more difficult
> (especially if you don't know _Javascript_). Put the pieces together with tools 
> like _Webpack_ or _Browserify_ it is **simply impossible to the beginner**.

I think those guys need a tool that allows them focus on **getting an _Hello World_ done**, not getting the exercise being executed on their machine!

## Features

- run your html through a local HTTP server
- transparent transpilers:
  - write CSS, Less or Sass
  - write ES6 or even ES7*
  - use ES6 modules* to include Javascript into Javascript
- get code hints for Javascript, CSS, Less*, Sass*
  
(*) to be done

## Install & Run

`Cody` comes as a globally available command line tool which you install with `NodeJS`:

    npm install -g cody-cli
    
    
Once it is installed you can easily bootstrap a new web project:

    // setup a new empty folder
    mkdir my-web-project
    cd my-web-project
    
    // this run the magic!
    cody 
   
You project will be available at `http://localhost:8080` immediately, and every 
change in your project's folder will be reflected in the server.
   
## Less & Sass

`Cody` is able to understand `less` and `sass`:

	foo.less -> foo.less.css
	foo.scss -> foo.scss.css
	
> All your transpiled code supports **_sourcemaps_ out of the box!**

## ES2015

Use the `.jsx` extension to access all the `es2015` and `react` presets for _Babel_.

> All your transpiled code supports **_sourcemaps_ out of the box!**

## Live Updates

`.less`, `.sass` and `.jsx` files are transpiled automatically every time you save them. You just need to refresh your browser window.





