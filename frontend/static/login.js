var login = document.getElementById('login')
var formElement = document.getElementById('loginForm');

login.addEventListener('click', event => {
    event.preventDefault();
    console.log("Clicked");
    const formData = new FormData(formElement);
    const values = [...formData.values()];
    const isEmpty = values.includes('')

    if (isEmpty) {
        console.log('Please provide all values');
    }
    else {
        const data = Object.fromEntries(formData);

        fetch('https://reqres.in/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    }
});


