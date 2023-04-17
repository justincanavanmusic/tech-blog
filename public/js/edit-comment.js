async function editComment(event) {
    event.preventDefault();

    const body = document.querySelector('#body').value.trim()
    console.log(body)
    const id = window.location.toString().split('/')
    [
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
        document.location.replace(`/dashboard`);
      } else {
        alert('Failed to edit post');
      }
    }
document.querySelector('.edit-comment-form').addEventListener('submit', editComment)

