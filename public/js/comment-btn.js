async function commentBtn(e) {

    let commentId = e.target.getAttribute('data-id')

    document.location.replace(`edit-comment/${commentId}`)
}


document.querySelectorAll('.com-edit-btn').forEach(btn => {
    btn.addEventListener('click', commentBtn)
})