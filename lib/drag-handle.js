module.exports = makeHandle;

const setDragImageSupported = window.DataTransfer && 'setDragImage' in window.DataTransfer.prototype;

function makeHandle(circle, { className, ondrag, ondragend }) {
  let el = document.createElement('div');

  function ondragstart({ dataTransfer }) {
    circle.parentNode.addEventListener('dragover', ondragCommon);
    dataTransfer.setData("text/plain", "");
    dataTransfer.effectAllowed = 'move';
    if (setDragImageSupported) {
      // not all browsers support setDragImage
      dataTransfer.setDragImage(el, el.offsetWidth / 2, el.offsetHeight / 2);
    }
    circle.classList.add('dragging');
  }

  function ondragendCommon() {
    circle.classList.remove('dragging');
    circle.parentNode.removeEventListener('dragover', ondragCommon);
    ondragend();
  }

  function ondragCommon(event) {
    if (event.clientX === undefined || event.clientY === undefined) {
      // console.log('Invalid drag event!');
      return;
    }
    event.preventDefault(); // accept drop
    let {
      dataTransfer,
      clientX, clientY,
      currentTarget
    } = event;
    dataTransfer.dropEffect = 'move';
    let { left, top } = currentTarget.getBoundingClientRect();
    ondrag({
      clientX: clientX - left,
      clientY: clientY - top
    });
  }

  el.className = `circle-handle ${className}`;
  el.draggable = true;

  // cannot use 'drag' event because Firefox bug - see: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  // el.addEventListener('drag', ondrag);
  el.addEventListener('dragstart', ondragstart);
  el.addEventListener('dragend', ondragendCommon);

  circle.appendChild(el);
  return el;
}
