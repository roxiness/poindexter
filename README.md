<div align="center">
  <img src="./poindexter.svg" width="300px">
  
  Search engine for your static site
</div>

Poindexter scans a folder for HTML files and indexes their content by their relative filename. The index is output to a `poindexter.bundle.js` bundle, which can be imported and searched with poindexter or flexsearch.

## Getting started

#### Creating a searchable index

```
npx poindexter [HTML folder]
```

#### Initializing poindexter

```javascript
  import { client } from "poindexter/runtime";
  let index

  client.init()
    .then(res => (index = res))
```

#### Searching the index
```javascript
index.search(query)
```



### FAQ

#### Can I use Poindexter with a SPA?
Poindexter requires a static site. If you have a SPA, have a look at [Spank](https://github.com/roxiness/spank).

#### Where can I use Poindexter?
Poindexter can be served from the client, your own backend or a serverless function.

#### How big are the index bundles?
A site like [routify.dev](https://routify.dev) with 65 pages, generates a 65 kb bundle after brotli compression.
```
