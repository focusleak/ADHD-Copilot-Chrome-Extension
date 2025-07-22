const remove_search_box_placeholder = (searchInput) => {
    // Remove the placeholder of the search input box
    if (searchInput) {
        console.log('Search input found');
        searchInput.placeholder = '';
        const observer = new MutationObserver(() => {
            if (searchInput.placeholder != '') {
                console.log(searchInput.placeholder)
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
    const searchInput = document.getElementById('query');
    remove_placeholder(searchInput);
});
