!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("coi-path-config",[],t):"object"==typeof exports?exports["coi-path-config"]=t():e["coi-path-config"]=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}({10:function(e,t,n){"use strict";n.r(t),n.d(t,"COI_TENANT",function(){return u}),n.d(t,"COI_CLIENT",function(){return a}),n.d(t,"COI_VERSION",function(){return f}),n.d(t,"COI_LOCALE_QUERY",function(){return l}),n.d(t,"API_ENV",function(){return d});var r=n(12),o=window&&window.location,i=o.hostname,c=o.pathname,u=c.replace(/.+tenants\//gi,"").replace(/\/.+/,""),a=c.replace(/-ui\/.+|-ui?\//gi,"-ui").replace(/.+\//gi,""),f=c.replace(/.+(?=v\d\.\d\/)/gi,"").replace(/\/.+/gi,""),l=Object(r.urlParamToObject)().ui_locale,d="identity.cisco.com"===i?"":/int-/i.test(i)?"int-":/stg-|dev-|localhost/i.test(i)?"stg-":void 0},12:function(e,t,n){"use strict";n.r(t),n.d(t,"urlParamToObject",function(){return o}),n.d(t,"objectToUrlParam",function(){return i});var r=(window&&window.location).search,o=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r,t={};return e.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,n,r){Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!1})}),t},i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=Object.entries(e);if(!t.length)return"";var n="?";return t.forEach(function(e,r){var o=r<t.length-1?"&":"";n="".concat(n).concat(e[0],"=").concat(e[1]).concat(o)}),n}}})});