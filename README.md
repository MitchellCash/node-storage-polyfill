# node-storage-polyfill

A Web Storage API polyfill for both `window.localStorage` and `window.sessionStorage` for Node.js
environments.

## Motivation

There are certain situations where you need to access the Web Storage browser APIs, but they aren't
available in Node.js environments, such as:

- Running tests locally in a Node.js environment that make calls to the Web Storage browser APIs
- Using a Server-Side Rendering (SSR) framework that won't compile because the browser APIs aren't
  available server-side

This module provides fully compatible APIs and exposes both `localStorage` and `sessionStorage`
globally as if you were working in a browser context where the APIs would be fully available.

## Installation

```sh
npm install node-storage-polyfill
```

## Usage

```js
// CommonJS
require('node-storage-polyfill');

// ES Module
import 'node-storage-polyfill';
```

This exposes `global.localStorage` and `global.sessionStorage` to your codebase to interact with.

## Example

```js
import 'node-storage-polyfill';

sessionStorage.setItem('KEY_1', 'VALUE_1');
console.log(sessionStorage.getItem('KEY_1'));
// Output: 'VALUE_1'
```

## Limitations

The `localStorage` API that is exposed does not differ from `sessionStorage` and only holds the
data in-memory. This differs from the browser based `localStorage` API which stores data between
sessions.

## Recognition

I would like to thank [capaj](https://github.com/capaj) and his work on
[localstorage-polyfill](https://github.com/capaj/localstorage-polyfill) which was working for me
until I needed a `sessionStorage` polyfill, and a new project to spend some time on. Most of the
logic and tests are based on their module, but rewritten in TypeScript and adds support for
`sessionStorage` as well as `localStorage`.
