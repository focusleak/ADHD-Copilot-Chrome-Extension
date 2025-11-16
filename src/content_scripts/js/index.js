const ICON_LINKS = Array.from(
    document.querySelectorAll('link[rel="icon"]')
).map(({ href }) => href)
console.log('ICON_LINKS', ICON_LINKS)
