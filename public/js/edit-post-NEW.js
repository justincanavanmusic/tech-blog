async function editPostForm(event) {
  console.log('hello')
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const body = document.querySelector('#body').value.trim();

 
   //const id    takes the url, turns it to a string, splits it at each ('/') and forms a new array of strings, one at each split. 
  
  //below we fetch the data that was input from the fetch statements put route. it stringifys the data so it is able to be accessed on the edit-post-NEW handlebars page. this is all stored in the "responseObject" const
    const responseObject = await fetch(`/api/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(responseObject) //full response object (id, title, body, user_id, included User object, included Comments)
  
//if the responseObject is true then redirect to "dashboard" endpoint
    if (responseObject.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to edit post');
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editPostForm);
  