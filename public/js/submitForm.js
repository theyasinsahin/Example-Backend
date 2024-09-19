document.addEventListener("DOMContentLoaded", function() {
    const questionnaireForm = document.getElementById('questionnaire');

    questionnaireForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const formData = new FormData(questionnaireForm);
        const scores = calculateScores(formData);
        const email = document.getElementById('email').value; 


        formData.append('email', email);
        formData.append('totalScore', scores.totalScore);
        formData.append('negativeEmotionsScore', scores.negativeEmotionsScore);
        formData.append('perceivedBarriersScore', scores.perceivedBarriersScore);

        const recaptchaResponse = grecaptcha.getResponse();
       
        if (!recaptchaResponse) {
            alert("Lütfen reCAPTCHA doğrulamasını tamamlayın.");
            return;
        }

        fetch('/', {
            method: 'POST',
            body: formData
        }).then(async response => {
            if(response.ok){
                window.location.href = '/submit-survey';
            }else{
                const errorText = await response.text();
                console.error('Failed to submit form:', errorText);
            }
          })
          .catch(error => {
            console.error('POST işlemi başarısız:', error);
        });
    });
});


function calculateScores(formData) {
    let totalScore = 0;
    let negativeEmotionsScore = 0;
    let perceivedBarriersScore = 0;
    const negativeEmotionsItems = [1, 2, 3, 4, 7];
    const perceivedBarriersItems = [5, 6, 8, 9];

    for (let [key, value] of formData.entries()) {
        if (key.startsWith('q')) {
            const itemNumber = parseInt(key.replace('q', ''));
            const score = parseInt(value);
            if (!isNaN(score)) {
                totalScore += score;
                if (negativeEmotionsItems.includes(itemNumber)) {
                    negativeEmotionsScore += score;
                }
                if (perceivedBarriersItems.includes(itemNumber)) {
                    perceivedBarriersScore += score;
                }
            }
        }
    }

    return {
        totalScore: totalScore,
        negativeEmotionsScore: negativeEmotionsScore,
        perceivedBarriersScore: perceivedBarriersScore
    };
}
