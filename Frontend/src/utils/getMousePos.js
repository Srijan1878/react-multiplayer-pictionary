function getMousePos(canvas, evt, touchDevice) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y
  return {
    x:
      ((((!touchDevice ? evt.clientX : evt.touches[0].clientX) - rect.left) *
        scaleX) /
        canvas.width) *
      100, // scale mouse coordinates after they have
    y:
      ((((!touchDevice ? evt.clientY : evt.touches[0].clientY) - rect.top) *
        scaleY) /
        canvas.height) *
      100, // been adjusted to be relative to element
  };
}

export default getMousePos;
