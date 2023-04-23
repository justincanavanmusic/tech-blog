async function viewPosts(event) {

let postDiv = document.getElementById('view-posts');
// console.log(postToggle)

if(postDiv.style.display==='none') {
    postDiv.style.display='block';
} else {
    postDiv.style.display='none';
}

}

const viewPostBtn = document.getElementById('post-btn');

console.log(viewPostBtn);

viewPostBtn.addEventListener('click', viewPosts)