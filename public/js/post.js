async function editPostForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;

    const body = document.querySelector('#body').value.trim();

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert('Failed to edit post');
    }
  }

  const deleteButton = async (event) => {
    console.log('deleteButton function called');

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const commentButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
    document.location.href=`/edit-comment/${id}`
  }
}
document.querySelectorAll('.comment-btn').forEach(commentBtn=> {
  commentBtn.addEventListener('click', commentButton)
})


  var delButtonEls = document
  .querySelectorAll('.comment-list')
  for (let i = 0; i < delButtonEls.length; i++) {
  delButtonEls[i].addEventListener('click', deleteButton);
  }

  // document.querySelector('.edit-post-form').addEventListener('submit', editPostForm);
  