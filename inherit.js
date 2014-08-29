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
      child[key] = props[key];
    }

    child._super = function(name) {
      var tmp = this._super;
      this._super = parent._super;
      var rval = parent[name].apply(this,
        Array.prototype.slice.call(arguments, 1));
      this._super = tmp;
      return rval;
    };

    var newClass = child.init;
    newClass.prototype = child;
    newClass.prototype.constructor = newClass;
    newClass.extend = BaseClass.extend;

    return newClass;
  };

  global.Class = BaseClass;

})(this);
