#InheritJS

A simple JavaScript inheritance library for ES5 inspired
by John Resig's [Simple JavaScript Inheritance](http://ejohn.org/blog/simple-javascript-inheritance/).

If you want to use this library in a non-ES5 environment, consider including [es5-shim](https://github.com/es-shims/es5-shim).

## Example

```javascript
var Person = Class.extend({
  init: function(isDancing){
    this.dancing = isDancing;
  },
  dance: function(){
    return this.dancing;
  }
});

var Ninja = Person.extend({
  init: function(){
    this._super( false );
  },
  dance: function(){
    // Call the inherited version of dance()
    return this._super();
  },
  swingSword: function(){
    return true;
  }
});

var p = new Person(true);
p.dance(); // => true

var n = new Ninja();
n.dance(); // => false
n.swingSword(); // => true

// Should all be true
p instanceof Person && p instanceof Class &&
n instanceof Ninja && n instanceof Person && n instanceof Class
```
