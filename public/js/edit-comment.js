async function editComment(event) {
    event.preventDefault();

    const body = document.querySelector('#body').value;
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const responseObject = await fetch(`/api/comment/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          body
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (responseObject.ok) {
        const commentBtn = document.querySelector('#comment-btn')
        const postId = commentBtn.getAttribute('data-id');
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to edit post');
      }
    }
document.querySelector('.edit-comment-form').addEventListener('submit', editComment)

