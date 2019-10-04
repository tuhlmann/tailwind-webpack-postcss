
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
