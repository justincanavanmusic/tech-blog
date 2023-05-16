const comDelBtn = async (e) => {

    let btnId = e.target.getAttribute('data-id')

    const res = await fetch(`/api/comment/${btnId}`, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }

    })
    .then((res, err) => {
        if (res.ok) {
            console.log('Comment deleted!')
        } else {
            console.log("There was an error!", err) 
        }
    })

}

document.querySelectorAll('.com-del-btn').forEach(el => 
    el.addEventListener('click', comDelBtn))