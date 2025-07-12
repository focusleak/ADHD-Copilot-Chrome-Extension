console.log("unlock copy");
document.addEventListener('copy', function (e) {
    e.stopImmediatePropagation();
    return true;
}, true);