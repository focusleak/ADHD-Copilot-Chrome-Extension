// https://openreview.net/forum?id=kZpNDbZrzy
window.addEventListener("load", function () {
    // document.querySelector(".note_content_pdf[title='Download PDF']").download = true;

    // detect the modal exist
    let bibTexModal = document.querySelector("#bibtex-modal");
    if (bibTexModal) {
        let downloadBibButton = document.createElement("button");
        downloadBibButton.innerHTML = "Download BibTeX";
        downloadBibButton.className = "btn btn-default";
        // create bibTeX file
        downloadBibButton.onclick = function () {
            let bib = document.querySelector("#bibtex-modal pre.bibtex-content").innerText;
            let blob = new Blob([bib], { type: "text/plain;charset=utf-8" });
            let fileName = document.querySelector(".citation_title")?.innerText || document.querySelector(".note_content_title span")?.innerText
            saveAs(blob, fileName + ".bib");
        }
        bibTexModal.querySelector(".modal-footer").appendChild(downloadBibButton);
    }
})
// 读取当前url
const url = window.location.href;
// 是pdf页面
if (url.includes('.net/pdf')) {
    // 从url中获取year 和hash
    html_url = url.replace('.net/pdf', '.net/forum');
    console.log(html_url);
}