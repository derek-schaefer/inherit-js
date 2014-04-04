var Person = Class.extend({
  init: function(isDancing){
    console.log('Person init');
    this.dancing = isDancing;
  }
});

var Ninja = Person.extend({
  init: function(){
    console.log('Ninja init');
    this._super( false );
  }
});

var p = new Person(true);
console.log(p.dancing); // => true

var n = new Ninja();
console.log(n.dancing); // => false
