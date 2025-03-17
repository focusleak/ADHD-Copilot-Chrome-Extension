// NeurlIPS Proceedings

// 读取当前url
const url = window.location.href;
// 是pdf页面
if (url.includes('.pdf')) {
    // 从url中获取year 和hash
    const year = url.match(/\/paper\/(\d{4})\//)[1];
    const hash = url.match(/\/file\/(.+?)\-Paper|Paper-Conference\.pdf/)[1];
    const abstract_url = `https://proceedings.neurips.cc/paper_files/paper/${year}/hash/${hash}-Abstract.html`;
    console.log(abstract_url);
}
// HTML页面
if (url.includes('.html')) {
    // paper按钮增加download
    const paper_btn = document.querySelector('[href*=".pdf"]');
    const title = document.querySelector('h4').innerText;
    paper_btn.download = title + '.pdf';
}