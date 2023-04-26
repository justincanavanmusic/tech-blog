async function viewCommentPage(event) {

let btnId = event.target.getAttribute('data-id')
console.log(btnId);

let commentBtn = document.querySelector(`.data-${btnId}`)

document.location.replace(`/post/${btnId}`)
}

document.querySelectorAll('.comment-page').forEach(btn=> {
    btn.addEventListener('click', viewCommentPage)
})

