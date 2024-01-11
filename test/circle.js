const test = require('node:test');
const assert = require('node:assert/strict');

require('jsdom-global')();

window.matchMedia = () => ({ matches: false });

const makeCircle = require('../lib/circle');

document.body.innerHTML = '<div class="container"></div>';

test('map-circle-control - create DOM nodes', function () {
  const container = document.querySelector('.container');

  let circle = makeCircle();
  circle.addTo(container);
  circle.center = [250, 200];
  circle.radius = 175;


  let c = document.querySelector('.container .circle');

  assert.equal(c.childNodes.length, 5, 'circle should have 5 child elements');
  assert.ok(c.style, 'circle should have style property');
  assert.equal(c.style.left, '250px');
  assert.equal(c.style.top, '200px');
});
