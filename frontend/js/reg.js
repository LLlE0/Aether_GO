async function reg_submit(event) {
    event.preventDefault();
  
    const login = document.getElementById("login").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm_password").value;
  
    if (password !== confirmPassword) {
      alert("Пароли не совпадают!");
      return;
    }
  
    const credentials = {
      username: login,
      email: email,
      password: password,
    };
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    };
  
    try {
        const response = await fetch('/reg/new', requestOptions);
        
        if (response.ok) {
            const data = await response.json();
            if (data.redirect) {
                window.location.href = data.redirect;
            }
        } else {
            const errorText = await response.text();
            alert(`Login failed: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  }
  