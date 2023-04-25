let uNameDiv=document.querySelector(".u-name-div")
let divId = uNameDiv.getAttribute('data-id')
console.log(divId);

if(window.innerWidth<768) {

}


async function viewCommentPage(event) {

let btnId = event.target.getAttribute('data-id')
console.log(btnId);

let commentBtn = document.querySelector(`.data-${btnId}`)

document.location.replace(`/post/${btnId}`)
}

document.querySelectorAll('.comment-page').forEach(btn=> {
    btn.addEventListener('click', viewCommentPage)
})