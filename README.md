Cody Cli
---

`Cody Cli` is a command line utility designed to help web development at the beginning 
of the developer's career.

[![Stories in Ready](https://badge.waffle.io/PoliteJS/cody-cli.svg?label=ready&title=Ready)](http://waffle.io/PoliteJS/cody-cli)
[![Backlog](https://badge.waffle.io/PoliteJS/cody-cli.svg?label=in%20progress&title=In Progress)](http://waffle.io/PoliteJS/cody-cli)

## Why?

I've spent almost one year of my life **teaching the basics of web development to people who were completely strangers** to this mighty and vaste universe.

I discovered there are tons of concepts that needs to be learned, among those the environment which runs the code.

Setting up a simple server (NIGIX, Apache) it's a difficult business, setting up Grunt / Gulp to transpile LESS is even more difficult, especially if you don't know Javascript!

I think those guys need a tool that allows in focusing on **getting an _Hello World_ done**, not getting the exercise being executed!

## Features

- run your html through a proper HTTP server
- get code hints for Javascript, CSS, Less*, Sass*
- transparent transpilers:
  - write CSS, Less* or Sass* 
  - write ES6* or even ES7*
  - use ES6 modules* to include Javascript into Javascript
  
(*) to be done

## Install & Run

`Cody Cli` comes as a globally available command line tool:

    npm install -g cody-cli
    
    
Once it is installed you can easily bootstrap a new web project:

    // setup a new empty folder
    mkdir my-web-project
    cd my-web-project
    
    // this run the magic!
    cody 
   
You project will be available at `http://localhost:3000` immediately, and every 
change in your project's folder will be reflected in the server.
   