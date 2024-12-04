document.body.contentEditable = "true"
window.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) { // ESC
        document.body.contentEditable = "false"
    }
})