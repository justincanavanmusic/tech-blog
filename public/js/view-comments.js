async function viewComments(event) {


   let commentDiv = document.querySelector('#comment-toggle');

   let postId=commentDiv.getAttribute('data-id')
   console.log(postId);

// let btn = document.querySelectorAll
//    let btnId=c

 
//    if(commentDiv.classList.contains('d-none')) {
//     commentDiv.setAttribute('class', 'd-block')
//    } else if (commentDiv.classList.contains('d-block')) {
//     commentDiv.setAttribute('class', 'd-none')
//    }
   
commentDiv.classList.toggle('d-block');
commentDiv.classList.toggle('d-none');

// if(commentDiv.style.display==='d-none') {
//     commentDiv.style.display==='d-block';
// } else {
//     commentDiv.style.display==='d-none';
// }
 
}

const viewCommentBtn = document.querySelectorAll('.view-comments').forEach(btn=> {
    btn.addEventListener('click', viewComments)
})

// document.getElementById('view-comments').addEventListener('click', viewComments)