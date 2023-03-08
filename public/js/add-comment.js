async function addCommentForm(event) {
    event.preventDefault();
  
    const body = document.querySelector('#comment').value;
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        body,
      post_id : id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/post/' + id);
    } else {
      alert('Failed to add comment');
    }
  }
  
  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', addCommentForm);