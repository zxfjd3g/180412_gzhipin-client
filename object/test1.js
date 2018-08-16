function Parent(a, b) {
  this.a = a
  this.b = b
}

Parent.prototype.pMethod = function () {
  console.log('pMethod()')
}

function Child(a, b, c) {
  Parent.call(this, a, b)
  this.c = c
}

Child.prototype.cMethod = function () {
  console.log('cMethod()')
}

function inherit(child, parent) {

}

