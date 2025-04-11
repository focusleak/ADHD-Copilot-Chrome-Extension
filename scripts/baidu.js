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

remove_search_box_placeholder();
// window.addEventListener('load', function () {
// });
