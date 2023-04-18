async function viewCommentPage(event) {



const commentsBtn = document.getElementById('comment-page') 

const id = commentsBtn.getAttribute('data-id')

document.location.replace(`/post/${id}`)
}

document.getElementById('comment-page').addEventListener('click', viewCommentPage)