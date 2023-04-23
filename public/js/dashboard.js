async function addPostForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#content').value;

    console.log('hello')
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to add post');
    }
  }

  const deleteButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const editButton = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
    document.location.href=`/edit-post/${id}`
   
  }
}

  document.querySelectorAll('.edit-btn').forEach(editBtn=> {
    editBtn.addEventListener('click', editButton)
  })

  document
    .querySelector('.new-post-form')
    .addEventListener('submit', addPostForm);

  document
  .querySelectorAll('.post-list').forEach(postlist=> {
    postlist.addEventListener('click', deleteButton);
  })


 