const observeDOM = (function () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) {
            return;
        }

        if (MutationObserver) {
            // define a new observer
            const mutationObserver = new MutationObserver(callback);

            // have the observer observe for changes in children
            mutationObserver.observe(obj, {
                attributeFilter: ['style'],
                attributes: true,
                childList: true,
                subtree: true,
            });
            return mutationObserver;
        }
        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();

(() => {
    const elem = document.getElementById('api');
    changeElements();
    observeDOM(elem, function (m) {
        changeElements();
    });
})();

function changeElements() {
    const buttonsElem = document.getElementsByClassName('buttons')[0];
    console.log(buttonsElem, buttonsElem.innerHTML, buttonsElem.innerHTML.length);
    if (buttonsElem.innerHTML.length === 0) {
        buttonsElem.style.display = 'none';
    }

    //Change email input to div
    const input = document.getElementById('signInName');
    if (input) {
        const email = input.getAttribute('value');
        if (input.innerHTML !== email) {
            if (email) {
                input.outerHTML = '<div class="username">' + email + '</div>';
            }
        }
    }

    //Move forgot password link
    const passwordLabel = document.getElementsByClassName('password-label')[0];
    if (passwordLabel && passwordLabel.parentElement.firstElementChild === passwordLabel) {
        passwordLabel.parentElement.appendChild(passwordLabel);
    }

    //Add back button
    const nextButton = document.getElementById('next');
    const backButton = document.getElementsByClassName('back-button');
    if (nextButton && backButton.length === 0) {
        const newButton = document.createElement('button');
        newButton.className = 'back-button';
        newButton.innerHTML = '<div class="back-button-text" onclick="location.reload()"><span class="material-icons back-icon">arrow_back_ios</span>Back</div>';
        nextButton.parentElement.appendChild(newButton);
        nextButton.parentElement.appendChild(nextButton);
    }

    const emailField = document.getElementById('email');
    const verificationField = document.getElementById('email_ver_input');
    const verificationButton = document.getElementById('email_ver_but_send');
    const continueButton = document.getElementById('continue');
    const isSendVerificationStep = verificationButton?.style.display !== 'none' && verificationField?.style.display === 'none';
    const isVerificationCodeStep = verificationField?.style.display !== 'none' && verificationButton?.style.display === 'none';

    if (isSendVerificationStep) {
        //add hint to email field
        const emailInput = document.getElementById('email');
        const emailHint = new URLSearchParams(window.location.search).get('hint');
        if (emailInput && emailHint) {
            emailInput.value = emailHint;
        }

        //hide continue button
        continueButton.style.display = 'none';
        document.getElementsByClassName('buttons')[2].style.display = 'none';
        document.getElementById('email_ver_wait').innerText = 'Please wait';
    }

    //show verification code
    if (isVerificationCodeStep && emailField.style.display !== 'none') {
        emailField.style.display = 'none';
        const verificationDiv = document.getElementById('email_info');
        verificationDiv.innerHTML = verificationDiv.innerText.replace('{0}', '<b>' + emailField.value + '</b><br/>');

        //hide continue button
        continueButton.style.display = 'none';

        const verifyButton = document.getElementById('email_ver_but_verify');
        verifyButton.parentElement.appendChild(verifyButton);
        verifyButton.innerText = 'Continue';

        document.getElementById('email_ver_but_resend').innerText = 'Resend verification email';
        document.getElementsByClassName('intro')[0].firstElementChild.innerHTML = 'Check your email';
    }

    //skip continue step
    const verificationSuccess = document.getElementById('email_success');
    if (verificationSuccess !== null && verificationSuccess.style.display !== 'none') {
        continueButton.click();
    }

    //show change password
    const newPassword = document.getElementById('newPassword');
    const cancelButton = document.getElementById('cancel');
    if (newPassword !== null && newPassword.style.display !== 'none' && cancelButton.style.display !== 'block') {
        document.getElementsByClassName('intro')[0].firstElementChild.innerHTML = 'Create a password';
        cancelButton.style.display = 'block';
        cancelButton.classList.add('back-button');
        continueButton.parentElement.appendChild(continueButton);
        const passwordInfo = document.createElement('div');
        passwordInfo.className = 'password-info';
        passwordInfo.innerHTML = 'Strong password:' +
            '<div class="info-item">contains at least 8 characters</div>' +
            '<div class="info-item">contains both lower (a-z) and upper case letters (A-Z)</div>' +
            '<div class="info-item">contains at least one number (0-9) or a symbol</div>';
        document.getElementById('reenterPassword').parentElement.appendChild(passwordInfo);
    }
}
