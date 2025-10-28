const downloadButton = document.createElement('span');
downloadButton.style.cursor = 'pointer';
downloadButton.style.color = 'blue';
downloadButton.innerText = 'Download BibTeX';
downloadButton.style.float = 'right';
downloadButton.onclick = function () {
    let bibTet = document.querySelector("#bib-cite-target").value;
    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(bibTet);
    a.download = document.querySelector('h1.title.mathjax').innerText + '.bib';
    a.click();

}
document.querySelectorAll("#bib-cite-modal div")[3].appendChild(downloadButton);
