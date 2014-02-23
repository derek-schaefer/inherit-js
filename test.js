// TODO: Write mixin method

function inherit(base, methods) {
  if (typeof methods !== 'object') throw 'nope';
  if (typeof methods.init !== 'function') throw 'nope';
  var obj = function() {};
  obj.prototype = Object.create(base.prototype);
  for (key in methods) {
    var f = methods[key];
    if (typeof f === 'function') {
      methods[key] = function() {
        this._super = base.prototype[key];
        //console.log('hmmm', this._super, base[key], base);
        return f.apply(this, arguments);
      };
    }
    obj.prototype[key] = methods[key];
  }
  /*obj.prototype.constructor = function() {
    this.init();
  };*/
  return obj;
}

var Base = inherit(Object, {
  init: function() {
    //console.log('init', this._super);
  },
  stuff: function() {
    console.log('stuff', this._super);
  }
});

var Child = inherit(Base, {
  init: function() {
    //console.log('init2', this._super);
  },
  stuff: function() {
    console.log('stuff2');
    this._super();
  }
});

var b = new Base();
var c = new Child();

b.stuff();
c.stuff();
