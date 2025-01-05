const resizable = document.getElementById('resizable');

// Define the total number of segments
const totalSegments = 60;
const minWidth = 60; // Minimum width in pixels (1 pixel per segment)
const maxWidth = 600; // Maximum width in pixels (10 pixels per segment)

resizable.style.width = `${minWidth}px`;

// Handle resizing by listening for the mouse events
let isResizing = false;

resizable.addEventListener('mousedown', function (e) {
  isResizing = true;
});

document.addEventListener('mousemove', function (e) {
  if (isResizing) {
    let newWidth = e.clientX - resizable.getBoundingClientRect().left;

    // Ensure the width is within the bounds of min and max
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;

    // Snap the width to the nearest segment
    const segmentSize = maxWidth / totalSegments;
    newWidth = Math.round(newWidth / segmentSize) * segmentSize;

    resizable.style.width = `${newWidth}px`;
  }
});

document.addEventListener('mouseup', function () {
  isResizing = false;
});
