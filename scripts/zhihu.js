window.addEventListener('load', function () {
    // Remove the placeholder of the search input box
    const searchInputList = document.querySelectorAll('.SearchBar-input input');
    searchInputList.forEach(searchInput => {
        if (searchInput) {
            searchInput.placeholder = '';
            console.log(123)
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
    })
});
