async function cardFloat(event) {

    let uNameDiv=document.querySelector(".u-name-div")
    let headerTitle=document.querySelector('.card-title')
    let titleDiv=document.querySelector('.title-div')
    
// let divId = uNameDiv.getAttribute('data-id')
if(window.innerWidth<768) {

  
//   headerTitle.classList.remove('align-self-start')
//   headerTitle.classList.add('align-self-center')
  uNameDiv.classList.remove('text-end')
  uNameDiv.classList.add('text-center')
    uNameDiv.classList.remove('float-end')
    uNameDiv.classList.add('mx-auto');
} else {
    // titleDiv.classList.remove('text-center')
    // headerTitle.classList.remove('align-self-center')
    // headerTitle.classList.add('align-self-start')
    uNameDiv.classList.remove('mx-auto');
    uNameDiv.classList.add('float-end')
    uNameDiv.classList.remove('text-center')
    uNameDiv.classList.add('text-end')
 
}
}

window.addEventListener('resize', cardFloat)