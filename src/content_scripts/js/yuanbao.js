
// function clearAllConversations() {
//     let conversationIds = Array.from(document.querySelectorAll('.yb-recent-conv-list .yb-recent-conv-list__item-name')).map(item => item.dataset.itemId)
//     conversationIds.forEach(id => {
//         axios.post('https://yuanbao.tencent.com/api/user/agent/conversation/v1/clear', {
//             conversationIds: [id],
//             uiOptions: {
//                 noToast: true
//             }
//         })
//     })
// }