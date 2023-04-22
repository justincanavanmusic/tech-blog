async function viewComments(event) {

let btnId = event.target.getAttribute('data-id')
console.log(btnId)

// console.log(event.target)
   let commentDiv = document.querySelector(`.data-${btnId}`);


if(commentDiv.style.display==='none') {
    commentDiv.style.display='block';
} else {
    commentDiv.style.display='none';
}
 

   let commentId = commentDiv.getAttribute('data-id')
console.log(commentId)



}

const viewCommentBtn = document.querySelectorAll('.view-comments').forEach(btn=> {
    btn.addEventListener('click', viewComments)
})
