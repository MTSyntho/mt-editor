document.getElementById('videoInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const timelineContent = document.getElementById('timelineContent');

    Array.from(files).forEach(file => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        
        const videoElement = document.createElement('video');
        videoElement.src = URL.createObjectURL(file);
        videoElement.controls = true;

        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle');

        videoItem.appendChild(videoElement);
        videoItem.appendChild(resizeHandle);
        timelineContent.appendChild(videoItem);

        // Resize functionality
        let isResizing = false;
        let startX;

        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });

        function resize(e) {
            if (!isResizing) return;
            const widthDiff = e.clientX - startX;
            const newWidth = Math.max(100, videoItem.offsetWidth + widthDiff); // Minimum width
            videoItem.style.width = `${newWidth}px`;
            startX = e.clientX; // Update start position
        }

        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
            snapToFrame(videoItem); // Snap to nearest frame
        }
    });
});

function snapToFrame(videoItem) {
    const frameWidth = 10; // Width of one frame (in pixels)
    const currentWidth = videoItem.offsetWidth;
    const snappedWidth = Math.round(currentWidth / frameWidth) * frameWidth; // Snap to nearest frame
    videoItem.style.width = `${snappedWidth}px`;
}
