document.addEventListener("DOMContentLoaded", function() {

    const verificationForm = document.getElementById('verification-form');
    const codeForm = document.getElementById('code-form');
    const questionnaireForm = document.getElementById('questionnaire');


    verificationForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        try {
            const response = await fetch('/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                document.getElementById('verification-section').style.display = 'none';
                document.getElementById('code-section').style.display = 'block';
            } else {
                alert('Failed to send verification code.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    codeForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value.trim();
        const code = document.getElementById('verification-code').value.trim();

        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, code })
            });

            if (response.ok) {
                document.getElementById('code-section').style.display = 'none';
                questionnaireForm.style.display = 'block';
            } else {
                alert('Invalid verification code.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = regex.test(email);

    // E-posta formatı doğruysa ve '@ogr.deu.edu.tr' ile bitiyorsa geçerli kabul et
    const domain = "@ogr.deu.edu.tr";
    const isDomainValid = email.endsWith(domain);

    return isEmailValid && isDomainValid;
}