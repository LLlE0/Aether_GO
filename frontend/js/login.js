async function auth_submit(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('/auth/try', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            redirect: 'manual'
        });
        
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