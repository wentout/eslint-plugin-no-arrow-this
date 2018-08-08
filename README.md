# eslint-plugin-no-arrow-this

## Proposal

This is a [eslint](https://eslint.org/) plugin for warning "this" keyword inside of arrow functions.

For example, you have a code with regular function:

```javascript
(function () {
  var me = this;
  console.log(me);
}.bind(123))();
```

And then, somehow, may be after re-factoring, you will change that [**regular function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) to [**arrow function**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

```javascript
(() => {
  var me = this;
  console.log(me);
}).bind(123)();

```

So, starting from that pont __`me`__ no longer follows to the binded context, and receives **`global`** or **`window`** instead.

This plugin will help you to find this conditions.


## Example .eslintrc configuration

```bash
$ npm i eslint-plugin-no-arrow-this
```

```javascript
"plugins": [
  // ... other plugins
  "eslint-plugin-no-arrow-this"
],
// ... other stuff
"rules": {
  // ... other rules
  "no-arrow-this/no-arrow-this": "warn"
}
```
So far here you will receive warning on `eslint`.
