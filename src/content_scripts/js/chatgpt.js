// 激活窗口时自动focus到输入框
window.addEventListener('focus', () => {
    console.log('标签页获得焦点');
    document.querySelector('#prompt-textarea')?.focus();
});

// patch
// https://chatgpt.com/backend-api/conversation/68b40fb6-1a68-8330-a86b-6642a93dd184
// document.addEventListener('click', function (event) {
//     const id = event.target.closest('a').href.split('/').pop();
//     axios.patch("https://chatgpt.com/backend-api/conversation/" + id)
// })