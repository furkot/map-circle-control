module.exports = makeHandle;


function makeHandle(circle, { className, ondrag, ondragend }) {
  let el = document.createElement('div');
  let dragging = false;

  function onTouchMove(event) {
    if (!dragging) {
      circle.classList.add('dragging');
      dragging = true;
    }
    event.preventDefault();
    let {
      clientX, clientY
    } = event.targetTouches[0];
    let { left, top } = circle.parentNode.getBoundingClientRect();
    ondrag({
      clientX: clientX - left,
      clientY: clientY - top
    });
  }

  function onTouchEnd() {
    circle.classList.remove('dragging');
    dragging = false;
    ondragend();
  }

  el.className = `circle-handle ${className}`;

  el.addEventListener('touchmove', onTouchMove,  { capture: true, passive: false });
  el.addEventListener('touchend', onTouchEnd);

  circle.appendChild(el);
  return el;
}
