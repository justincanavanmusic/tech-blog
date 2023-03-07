async function addPostForm(event) {
  event.preventDefault();

  const title = document.querySelector('#post_name').value;
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

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPostForm);