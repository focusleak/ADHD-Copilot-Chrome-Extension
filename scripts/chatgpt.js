// 激活窗口时自动focus到输入框
window.addEventListener('focus', () => {
    console.log('标签页获得焦点');
    document.querySelector('#prompt-textarea').focus();
});
