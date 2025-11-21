// NeurlIPS Proceedings

// 读取当前url
const url = window.location.href;
// 是pdf页面
if (url.includes('.pdf')) {
    // 从url中获取year 和hash
    const year = url.match(/\/paper\/(\d{4})\//)[1];
    const hash = url.match(/\/file\/(.+?)\-Paper|Paper-Conference\.pdf/)[1];
    const abstract_url = `https://proceedings.neurips.cc/paper_files/paper/${year}/hash/${hash}-Abstract.html`;
    // window.addEventListener('load',()=>{
    //     document.querySelector('body').innerHTML += `<br><a href="${abstract_url}">Abstract</a>`;
    // })
}
// HTML页面
if (url.includes('.html')) {
    // paper按钮增加download
    const paper_btns = document.querySelectorAll('[href*=".pdf"]');
    const title = document.querySelector('h4').innerText;
    paper_btns.forEach(paper_btn => {
        paper_btn.download = true;
    })
    // paper_btn.download = true // title + '.pdf';
}