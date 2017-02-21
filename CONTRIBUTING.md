# Contributing [![GitHub contributors](https://img.shields.io/github/contributors/bkimminich/juice-shop-ctf.svg)](https://github.com/bkimminich/juice-shop-ctf/graphs/contributors) [![HuBoard](http://img.shields.io/badge/Hu-Board-blue.svg)](https://huboard.com/bkimminich/juice-shop-ctf)

[![Build Status](https://travis-ci.org/bkimminich/juice-shop-ctf.svg?branch=master)](https://travis-ci.org/bkimminich/juice-shop-ctf)
[![Coverage Status](https://coveralls.io/repos/github/bkimminich/juice-shop-ctf/badge.svg?branch=master)](https://coveralls.io/github/bkimminich/juice-shop-ctf?branch=master)
[![Dependency Status](https://gemnasium.com/badges/github.com/bkimminich/juice-shop-ctf.svg)](https://gemnasium.com/github.com/bkimminich/juice-shop-ctf)
[![npm](https://img.shields.io/npm/dm/juice-shop-ctf-cli.svg)](https://www.npmjs.com/package/juice-shop-ctf-cli)
[![npm](https://img.shields.io/npm/dt/juice-shop-ctf-cli.svg)](https://www.npmjs.com/package/juice-shop-ctf-cli)

Found a bug? Got an idea for enhancement? Improvement for cheating
prevention?

Feel free to
[create an issue](https://github.com/bkimminich/juice-shop-ctf/issues)
or
[post your ideas in the chat](https://gitter.im/bkimminich/juice-shop)!
Pull requests are also highly welcome - please follow the guidelines
below to make sure your PR can be merged and doesn't break anything.

## Git-Flow

This repository is maintained in a simplified
[Git-Flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)
fashion: All active development happens on the ```develop``` branch
while ```master``` is used to create tagged releases from.

### Pull Requests

Using Git-Flow means that PRs have the highest chance of getting
accepted and merged when you open them on the ```develop``` branch of
your fork. That allows for some post-merge changes by the team without
directly compromising the ```master``` branch, which is supposed to hold
always be in a release-ready state.

## Unit & end-to-end Tests

There is a full suite containing

* independent unit tests for each module
* an e2e test simulating real input to the CLI

```
npm test
```

> The test suite currently runs unit and e2e tests in the same step.
> This is not best practice when it comes to software testing as it
> slows down the execution of the suite in total considerably and
> requires a working internet connection. On the plus side you can be
> _really sure_ that the program works as intended when `npm test`
> passes and still reports 100% code coverage.

### JavaScript Standard Style Guide

The `npm test` script verifies code complicance with the `standard`
style before running the tests. If PRs deviate from this coding style,
they will now immediately fail their build and will not be merged until
compliant.

[![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

> In case your PR is failing from style guide issues try running
> `standard --fix` over your code - this will fix all syntax or code
> style issues automatically without breaking your code. You might need
> to `npm i -g standard` first.

## Mutation Tests

The [mutation tests](https://en.wikipedia.org/wiki/Mutation_testing)
ensure the quality of the unit test suite by making small changes to the
code that should cause one or more tests to fail. If none does this
"mutated line" is not properly covered by meaningful assertions.

```
npm run stryker
```

> Only the unit tests are covered by mutation tests. For the end-to-end
> tests this would not be suitable for performance and concurrency
> reasons.

