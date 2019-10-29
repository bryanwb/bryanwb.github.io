/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.1"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-d22f3ed49a2340693187.js"
  },
  {
    "url": "app-dc0a964cf58a71ae1a97.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-9f89bfedd5a4e84a7703.js"
  },
  {
    "url": "index.html",
    "revision": "7b59b751cda0317788b462838ad1dd3b"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "69e0680a253813ea84612dd1b055f428"
  },
  {
    "url": "component---src-pages-index-jsx.36e1927bc3475c7147e2.css"
  },
  {
    "url": "component---src-pages-index-jsx-ea94e6e290e1d038a962.js"
  },
  {
    "url": "0-b16e36e4fa6b1359745c.js"
  },
  {
    "url": "static/d/895/path---index-6a9-WSJtNFSjVEbcX4mul5K6RLFtmeY.json",
    "revision": "c2f58fafedca596bed565051460e542b"
  },
  {
    "url": "component---src-pages-404-js-7a3a05b564407b161c5a.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "64a5f6cb157e49a516979e7fa4ddee18"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});