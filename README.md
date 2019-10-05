
## Description

This repository demonstrates a problem I have with properly configuring a Tailwind application with css modules, postcss and purgecss in webpack.

There's a purgecss section in `webpack.prod.config.js`. If that's commented out all works well, if it's active, all classes are removed from the test output (see `src/client/index.tsx`).

To see the issue, please start the application first in development mode:

```
npm run start:dev
```

3 classes are applied to the "Hello World" string and one is overridden.

Now build the production version:

```
npm run build
```

and start the server

```
npm start
```

and navigate to localhost:3000.

You'll find that all classes have been removed from the string.

If you then go to `webpack.prod.config.js` and comment out the `purgecss` section, build and run again, all classes are there.

Any help greatly appreciated!

## Update 04.10.2019

The problem was identified and resolved, thanks to [Gergely Tarjan](https://github.com/tailwindcss/discuss/issues/342)!

While the purgecss extractor did grep the camel cased classes "largeFont, textColorBlue, textBlue800", these classes do not appear within the css files since they are kebab cased there (large-font, text-color-blue, text-blue-800).

The solution was to change the extractor to add kebab-case versions of any camelCaseString that it could find in the document. And that worked. Have a look at the changed `webpack.prod.config.js` file.

Thanks again for the quick and outstanding help of the Tailwind team!

## Installation

```bash
$ npm install
```

## Running the app in development mode

```bash
# start development server
$ npm run start:dev

# browser should open, or go to http://localhost:4000

```

## Running the app in production mode

```bash
# build the app
$ npm run build

# start production app
$ npm run start

# go to http://localhost:3000

```
