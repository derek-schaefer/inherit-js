(function(global) {

  'use strict';

  function BaseClass() {}

  BaseClass.extend = function(props) {
    var parent = this.prototype;
    var child = Object.create(parent);

    if (typeof props.init !== 'function') {
      props.init = parent.init || function() {};
    }

    for (var key in props) {
      if (typeof props[key] === 'function' && typeof parent[key] === 'function') {
        child[key] = (function(key, fn) {
          return function() {
            var tmp = this._super;
            this._super = parent[key];
            var rval = fn.apply(this, arguments);
            this._super = tmp;
            return rval;
          };
        })(key, props[key]);
      } else {
        child[key] = props[key];
      }
    }

    var newClass = child.init;
    newClass.prototype = child;
    newClass.prototype.constructor = newClass;
    newClass.extend = BaseClass.extend;

    return newClass;
  };

  global.Class = BaseClass;

})(this);
