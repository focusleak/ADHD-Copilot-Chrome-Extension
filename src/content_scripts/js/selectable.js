// onhover元素时，将元素高亮，按+号选择父元素，按-号选择子元素
// console.log('selectable.js');
// window.addEventListener('load', function () {
//     console.log('load')
//     document.querySelectorAll('div').forEach(function (element) {
//         console.log('div')
//         element.addEventListener('mouseenter', function (event) {
//             console.log('hover');
//             this.style.border = '1px solid red';
//             // 阻止冒泡
//             event.stopPropagation();
//         })
//         element.addEventListener('mouseleave', function (event) {
//             console.log('leave');
//             this.style.border = '1px solid transparent';
//             // 阻止冒泡
//             event.stopPropagation();
//         })
//     })
// })