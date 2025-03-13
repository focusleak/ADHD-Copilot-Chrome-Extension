// NeurlIPS Proceedings

// 读取当前url
const url = window.location.href;
// 是pdf页面
if (url.includes('.pdf')) {
    // 从url中获取year 和hash
    const year = url.match(/\/paper\/(\d{4})\//)[1];
    const hash = url.match(/\/file\/(.+?)\-Paper.pdf/)[1];
    const abstract_url = `https://proceedings.neurips.cc/paper_files/paper/${year}/hash/${hash}-Abstract.html`;
    console.log(abstract_url);
}
