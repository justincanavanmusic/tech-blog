async function addPostForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#content').value;
  
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
      document.location.replace('/');
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
        document.location.replace('/');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', addPostForm);

   var buttonEls = document
  .querySelectorAll('.post-list')
  for (let i = 0; i < buttonEls.length; i++) {
  buttonEls[i].addEventListener('click', deleteButton);
  }
  // .addEventListener('click', deleteButton);
 