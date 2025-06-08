const remove_search_box_placeholder = () => {
    // Remove the placeholder of the search input box
    const searchInput = document.getElementById("kw");
    if (searchInput) {
        console.log(searchInput.placeholder);
        searchInput.placeholder = "";
        const observer = new MutationObserver(() => {
            console.log(searchInput.placeholder);
            if (searchInput.placeholder != "") {
                searchInput.placeholder = "";
            }
        });
        observer.observe(searchInput, {
            attributes: true,
            attributeFilter: ["placeholder"],
        });
    }
};
try {
    remove_search_box_placeholder();
}
catch (e) {
    console.log(e);
}
window.addEventListener("load", function () {
    remove_search_box_placeholder();
});
