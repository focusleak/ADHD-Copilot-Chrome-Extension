const remove_search_box_placeholder = () => {
    // Remove the placeholder of the search input box
    const searchInput = document.getElementById('kw');
    if (searchInput) {
        const observer = new MutationObserver(() => {
            if (searchInput.placeholder != '') {
                searchInput.placeholder = '';
            }
        });
        observer.observe(searchInput, {
            attributes: true,
            attributeFilter: ['placeholder']
        });
    }
}

window.addEventListener('load', function () {
    // remove_search_box_placeholder();
});
