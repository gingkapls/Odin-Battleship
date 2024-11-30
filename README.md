## What is this?

A minimal template to bootstrap Webpack applications and save development time

## How to use?

### Development
- Run `npm run dev` to run a development server on [localhost:8080](http://localhost:8080).
- Run `npm test` to run tests, by default `jest` will look for spec files in `test` directory.

### Building
- Run `npm run build` to build the application.
- The output will be located in the `dist` directory

## What is included?

### Typescript
- Configured to use latest ES features and compile to ES6 for broad compatibility

### Webpack
- Loaders for css, images and fonts are pre-configured.
- `ts-loader` is used for transpilation and type checking during development.
- `fork-ts-checker` plugin is used in production to speed up builds.

### Jest
- Uses `ts-node` to run typescript tests directly
- Provides coverage reports

