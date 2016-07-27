# Products Catalogue UI
based on [generator-react-webpack V2.0](https://github.com/newtriks/generator-react-webpack)
see also live [demo](http://product-catalogue.bitballoon.com)
## Instruction Setup
Before you start working with project, please install dependencies via:
```bash
npm install
```
When you are ready, you want to run "dev" server via:
```bash
npm server
```
When you are running "dev" server, you may run "integration" tests in "cucumber" format:
```bash
npm nightwatch
```
When you want to run "unit" tests please run:
```bash
npm test
```
When you want to run "unit" tests but for development purposes, please run:
```bash
npm test:watch
```
When you want to build sources to "dist" folder (minify, uglify, etc), please run:
```bash
npm build
```

## Task description
### EPIC 
> As a user, I want to edit product entries in my Products Catalogue database, 
> so that I have control over what products appear on my website.
### Instructions
1. Implement the project using ReactJS and running in NodeJS.
2. Write unit tests.
3. Commit and push to master.
### What is important:
- Clean code
- Unit test coverage
- Patterns usage (12 factor microservices app)
##### Bonus: use [dokerfile](https://docs.docker.com/engine/reference/builder/)

License
----
MIT
