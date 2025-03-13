console.log("unlock copy");
(function () {
    console.log(document.eventListeners);
    window.onload = function () {
        console.log(document.eventListeners);
        console.log(document.oncontextmenu)
        document.oncontextmenu = null;
        document.body.oncopy = null;
        const proxy = new Proxy(document.body, {});
        const observer = new MutationObserver(() => {
            if (document.body.oncopy) {
                document.body.oncopy = null;
            }
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['oncopy']
        });
        setTimeout(() => {
            document.oncontextmenu = null;
            document.body.oncopy = null;
            console.log(document.body.eventListeners);
        }, 3000);
    }
})()