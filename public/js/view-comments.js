async function viewComments(event) {

let btnId = event.target.getAttribute('data-id')
console.log(btnId)

   let commentDiv = document.querySelector(`.data-${btnId}`);


if(commentDiv.style.display==='none') {
    commentDiv.style.display='block';
} else {
    commentDiv.style.display='none';
}
 
}

const viewCommentBtn = document.querySelectorAll('.view-comments').forEach(btn=> {
    btn.addEventListener('click', viewComments)
})
