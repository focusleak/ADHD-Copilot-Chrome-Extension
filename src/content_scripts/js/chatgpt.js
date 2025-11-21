// 激活窗口时自动focus到输入框
window.addEventListener('focus', () => {
    document.querySelector('#prompt-textarea')?.focus();
});
