async function editPostForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const body = document.querySelector('#content').value;


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
      document.location.replace(`/post/${id}`);
    } else {
      alert('Failed to edit post');
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editPostForm);
  