const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value
    const password = document.querySelector('#password-signup').value
  
    if (username && email && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

const modalClose = async(event) => {
  let modal = document.getElementById('modal-el')

   modal.setAttribute('style', 'display: none');
}

document.querySelector('.modal-btn').addEventListener('click', modalClose)

document.querySelector('.modal-btn2').addEventListener('click', modalClose)

  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

