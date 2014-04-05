var inherit = require('../inherit');

describe('InheritJS', function() {
  var Class = inherit.Class;

  var Person = Class.extend({
    init: function(isDancing) {
      this.dancing = isDancing;
    },
    dance: function() {
      return this.dancing;
    }
  });

  var Ninja = Person.extend({
    init: function() {
      this._super(false);
    },
    dance: function() {
      // Call the inherited version of dance()
      return this._super();
    },
    swingSword: function() {
      return true;
    }
  });

  var p = new Person(true);
  var n = new Ninja();

  describe('Person', function() {
    it('should be an instance of Person', function() {
      expect(p instanceof Person).toBe(true);
    });

    it('should be an instance of Class', function() {
      expect(p instanceof Class).toBe(true);
    });

    it('init should set `dancing`', function() {
      expect(p.dancing).toBe(true);
    });

    it('`dance()` should return `dancing`', function() {
      p.dancing = false;
      expect(p.dance()).toBe(false);

      p.dancing = true;
      expect(p.dance()).toBe(true);
    });
  });

  describe('Ninja', function() {
    it('should be an instance of Ninja', function() {
      expect(n instanceof Ninja).toBe(true);
    });

    it('should be an instance of Person', function() {
      expect(n instanceof Person).toBe(true);
    });

    it('should be an instance of Class', function() {
      expect(n instanceof Class).toBe(true);
    });

    it('init should set `dancing`', function() {
      expect(n.dancing).toBe(false);
    });

    it('`dance()` should return `dancing`', function() {
      n.dancing = false;
      expect(n.dance()).toBe(false);

      n.dancing = true;
      expect(n.dance()).toBe(true);
    });

    it('`swingSword()` should return true', function() {
      expect(n.swingSword()).toBe(true);
    });
  });
});
