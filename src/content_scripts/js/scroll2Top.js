// window.addEventListener('load', () => {
//   document.body.addEventListener('contextmenu', function () {
//     ancestors = getAllAncestors(event.target);
//     ancestors.filter((element) => { return window.getComputedStyle(element).overflowY == 'auto' }).forEach(element => {
//       element.scrollTop = 0;
//     })
//   })
// })

// function getAllChildren(element) {
//   const children = [];
//   let current = element.firstChild;

//   while (current) {
//     children.push(current);
//     current = current.nextSibling;
//   }
//   return children;
// }

// function getAllAncestors(element) {
//   const ancestors = [];
//   let current = element.parentNode;

//   while (current) {
//     ancestors.push(current);
//     current = current.parentNode;
//   }
//   return ancestors;
// }