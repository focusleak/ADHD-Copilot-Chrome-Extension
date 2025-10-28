document.getElementById("searchBtn").addEventListener("click", function () {
  var queryString = document.getElementById("searchInput").value;
  var searchEngine = "https://www.google.com/search?q=";
  var searchUrl = searchEngine + queryString;
  window.open(searchUrl, "_blank");
});
const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref("Hello vue!");
    return {
      message,
    };
  },
}).mount("#app");
