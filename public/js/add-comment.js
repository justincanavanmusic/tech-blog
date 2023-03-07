async function addCommentForm(event) {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value;
  
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add comment');
    }
  }
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', addCommentForm);