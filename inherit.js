/* Simple JavaScript Inheritance for ES5
 * based on http://ejohn.org/blog/simple-javascript-inheritance/
 * MIT Licensed.
 */
(function(global) {

  'use strict';

  var objectCreate = Object.create;
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // Provide simple ES5 Object.create method if missing
  if (!objectCreate) {
    objectCreate = (function() {
      function F() {}

      return function(obj) {
        if (obj !== null || typeof obj !== 'object') {
          throw new Error('Object prototype may only be an Object or null');
        }

        F.prototype = obj || {};

        return new F();
      };
    });
  }

  // The BaseClass implementation (does nothing)
  function BaseClass() {}

  // Create a new BaseClass that inherits from this class
  BaseClass.extend = function(props) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    var proto = objectCreate(_super);

    // Copy the properties over onto the new prototype
    for (var name in props) {
      // Check if we're overwriting an existing function
      proto[name] = typeof props[name] === 'function' &&
        typeof _super[name] === 'function' && fnTest.test(props[name]) ?
        (function(name, fn) {
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only needs to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, props[name]) :
        props[name];
    }

    // The dummy class constructor
    var newClass = typeof proto.init === 'function' ?
      proto.init : // All construction is actually done in the init method
      function() {};

    // Populate our constructed prototype object
    newClass.prototype = proto;

    // Enforce the constructor to be what we expect
    proto.constructor = newClass;

    // And make this class extendable
    newClass.extend = BaseClass.extend;

    return newClass;
  };

  // Export to parent scope
  global.Class = BaseClass;
})(this);
