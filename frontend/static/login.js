var login = document.getElementById('login')
var formElement = document.getElementById('loginForm');

login.addEventListener('click', event => {
    event.preventDefault();
    console.log("Clicked");
    const formData = new FormData(formElement);

    if (formData.get('password') == '') {
        alert('Вы не ввели пароль');
    }
    else {
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);

        console.log(data);
    }
});


