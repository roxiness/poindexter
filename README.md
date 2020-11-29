<div align="center">
  <img src="./poindexter.svg" width="300px">
  
  **Search engine for your static site.**

   Powered by [FlexSearch](https://github.com/nextapps-de/flexsearch)

   <br />
   <br />
</div>


Poindexter scans a folder for HTML files and indexes each file's content by its relative filename. The full index is output to `poindexter.bundle.js`, which can be imported and searched with poindexter or flexsearch.

## Getting started

#### Creating a searchable index

```
npx poindexter [HTML folder] -o [output path]
```

#### Searching with Poindexter

```javascript
  import { client } from "poindexter/runtime";  

  // loads the poindexter.bundle.json.
  // for custom path: `client.init({ path: '/path/to/poindexter.bundle.js' })`
  client.init()

  // search the index.
  client.index.search(query)
```


### FAQ

#### Can I use Poindexter with a SPA?
Poindexter requires a static site. If you have a SPA, have a look at [Spank](https://github.com/roxiness/spank).

#### Where can I use Poindexter?
Poindexter can be served from the client, your own backend or a serverless function.

#### How big are the index bundles?
A site like [routify.dev](https://routify.dev) with 65 pages, generates a 65 kb bundle after brotli compression.


<img src="./poindexter.gif">