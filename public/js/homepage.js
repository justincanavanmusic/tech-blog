
// console.log(divId);
// console.log(window.innerWidth)

// async function cardFloat(event) {

//     let uNameDiv=document.querySelector(".u-name-div")
// let divId = uNameDiv.getAttribute('data-id')
// if(window.innerWidth<768) {

//     let uNameClass=uNameDiv.getElementsByClassName('float-end');
//     // console.log(uNameClass);

//     uNameDiv.classList.remove('float-end')
//     uNameDiv.classList.add('mx-auto');
// } else {
//     uNameDiv.classList.remove('mx-auto');
//     uNameDiv.classList.add('float-end')
// }
// }


async function viewCommentPage(event) {

let btnId = event.target.getAttribute('data-id')
console.log(btnId);

let commentBtn = document.querySelector(`.data-${btnId}`)

document.location.replace(`/post/${btnId}`)
}

document.querySelectorAll('.comment-page').forEach(btn=> {
    btn.addEventListener('click', viewCommentPage)
})

// window.addEventListener('resize', cardFloat)