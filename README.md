# cypress-example-todomvc-redux [![CircleCI](https://circleci.com/gh/cypress-io/cypress-example-todomvc-redux.svg?style=svg)](https://circleci.com/gh/cypress-io/cypress-example-todomvc-redux) [![renovate-app badge][renovate-badge]][renovate-app]
> TodoMVC example with full e2e test code coverage

This example is a fork of the official [Redux TodoMVC example](https://github.com/reduxjs/redux/tree/master/examples/todomvc) with a set of [Cypress.io](https://www.cypress.io) end-to-end tests. The tests run instrumented application code and the code coverage is saved automatically using [cypress-istanbul](https://github.com/cypress-io/cypress-istanbul) plugin.

## Install and use

```shell
npm ci
npm test
```

The full code coverage HTML report will be saved in `coverage`. You can also see text summary by running

```shell
npm run report:coverage:text
```

## CircleCI

Code coverage is saved on CircleCI as a test artifact. You can view the full report there by clicking on the "Artifacts" tab and then on "index.html"

![Code coverage artifact](images/circle-report.png)

The report is a static site, you can drill into each folder to see individual source files. This project should be 100% covered by Cypress tests:

![100% code coverage](images/100.png)

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
