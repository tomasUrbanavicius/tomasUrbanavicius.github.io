const step = {
    email: 0,
    password: 1,
    sendVerification: 2,
    verificationCode: 3,
    skipStep: 4,
    changePassword: 5,
    loading: 6,
    sendingVerification: 7,
};

var continueClicked = false;

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
    const elem = document.getElementsByTagName('body')[0];
    changeDom();
    observeDOM(elem, function (e) {
        changeDom();
    });
})();

function changeDom() {
    const currentStep = determineStep();

    switch (currentStep) {
        case step.email:
            changeEmailStepDom();
            break;
        case step.password:
            changePasswordStepDom();
            break;
        case step.sendVerification:
            changeSendVerificationStepDom();
            break;
        case step.sendingVerification:
            changeSendingVerificationStepDom();
            break;
        case step.verificationCode:
            changeVerificationCodeStepDom();
            break;
        case step.skipStep:
            skipStep();
            break;
        case step.changePassword:
            changeNewPasswordStepDom();
            break;
        case step.loading:
            changeLoadingStepDom();
            break;
    }

    changeErrorAlerts();
}

function changeLoadingStepDom() {
    console.log('changeLoadingStepDom');

    if (!document.getElementById('loading')) {
        const spinner = document.createElement('div');
        spinner.className = 'loading'
        spinner.id = 'loading'
        spinner.innerHTML = '<svg viewBox="0 0 66 66"><circle cx="33" cy="33" r="23" /></svg>';
        document.getElementById('simplemodal-overlay').appendChild(spinner);
    }

    //Change email step will be skipped while showing loader
    const changeEmailButton = document.getElementById('email_ver_but_edit');
    if (changeEmailButton && changeEmailButton.style.display !== 'none') {
        skipStep();
    }

    //remove loading
    const verifyButton = document.getElementById('email_ver_but_verify');
    if (document.getElementsByClassName('working')[0].style.display !== 'block' && document.getElementById('forgotPassword')) {
        removeOverlay();
    }
    if (verifyButton && verifyButton.style.display !== 'none') {
        removeOverlay();
    }
}

function changeEmailStepDom() {
    console.log('changeEmailStepDom');

    //hide first buttons element
    hideFirstButtonsElement();
}

function changePasswordStepDom() {
    console.log('changePasswordStepDom');

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
    if (nextButton && document.getElementsByClassName('back-button').length === 0) {
        const newButton = document.createElement('button');
        newButton.className = 'back-button';
        newButton.innerHTML = '<div class="back-button-text" onclick="location.reload()"><span class="material-icons back-icon">arrow_back_ios</span>Back</div>';
        nextButton.parentElement.appendChild(newButton);
        nextButton.parentElement.appendChild(nextButton);
    }

    //loading
    if (document.getElementsByClassName('working')[0].style.display === 'block') {
        addOverlay();
    }
}

function changeSendVerificationStepDom() {
    console.log('changeSendVerificationStepDom');

    //hide first buttons element
    hideFirstButtonsElement();

    const continueButton = document.getElementById('continue');
    if (continueButton.style.display !== 'none') {
        //add hint to email field
        const emailInput = document.getElementById('email');
        const emailHint = new URLSearchParams(window.location.search).get('hint');
        if (emailInput && emailHint) {
            emailInput.value = emailHint;
        }

        //hide continue button
        continueButton.style.display = 'none';
        document.getElementsByClassName('buttons')[2].style.display = 'none';
    }
}

function changeSendingVerificationStepDom() {
    if (!document.getElementById('simplemodal-overlay')) {
        addOverlay();
    }
}

function changeVerificationCodeStepDom() {
    console.log('changeVerificationCodeStepDom');

    const emailField = document.getElementById('email');
    const continueButton = document.getElementById('continue');

    //show verification code
    if (emailField.style.display !== 'none') {
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
}

function skipStep() {
    console.log('skipStep');

    const continueButton = document.getElementById('continue');
    if (!continueClicked) {
        continueClicked = true;
        addOverlay();
        continueButton.click();
    }
}

function changeNewPasswordStepDom() {
    console.log('changeNewPasswordStepDom');

    const continueButton = document.getElementById('continue');
    const cancelButton = document.getElementById('cancel');
    if (cancelButton.style.display !== 'block') {
        removeOverlay();
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

function changeErrorAlerts() {
    const errorAlerts = document.getElementsByClassName('error');
    for (let i = 0; i < errorAlerts.length; i++) {
        if (!errorAlerts[i].firstElementChild || !errorAlerts[i].firstElementChild.classList.contains('error-icon')) {
            const errorIcon = document.createElement('span');
            errorIcon.classList.add('material-icons');
            errorIcon.classList.add('error-icon');
            errorIcon.innerText = 'error_outline';
            errorAlerts[i].insertBefore(errorIcon, errorAlerts[i].firstChild);
        }
    }
}

function determineStep() {
    const inputFields = document.getElementsByTagName('input');
    const sendVerificationButton = document.getElementById('email_ver_but_send');
    const verifyButton = document.getElementById('email_ver_but_verify');
    const changeEmailButton = document.getElementById('email_ver_but_edit');
    const verificationWait = document.getElementById('email_ver_wait');

    if (document.getElementById('simplemodal-container')) {
        return step.loading;
    }

    if (inputFields.length === 1 && inputFields[0].id === 'signInName') {
        return step.email;
    }

    if (document.getElementById('forgotPassword')) {
        return step.password;
    }

    if (sendVerificationButton && sendVerificationButton.style.display !== 'none') {
        return step.sendVerification;
    }

    if (verificationWait && verificationWait.style.display !== 'none') {
        return step.sendingVerification;
    }

    if (verifyButton && verifyButton.style.display !== 'none') {
        return step.verificationCode;
    }

    if (changeEmailButton && changeEmailButton.style.display !== 'none') {
        return step.skipStep;
    }

    if (document.getElementById('newPassword')) {
        return step.changePassword;
    }

    console.log('unknown step');
}

function hideFirstButtonsElement() {
    const buttonsElem = document.getElementsByClassName('buttons')[0];
    if (buttonsElem && buttonsElem.innerHTML.trim().length === 0 && buttonsElem.style.display !== 'none') {
        buttonsElem.style.display = 'none';
    }
}

function addOverlay() {
    if (!document.getElementById('simplemodal-overlay') && !document.getElementById('simplemodal-container')) {
        console.log('Adding overlay');
        const overlay = document.createElement('div');
        overlay.id = 'simplemodal-overlay';
        const modalContainer = document.createElement('div');
        modalContainer.id = 'simplemodal-container';
        document.body.appendChild(overlay);
        document.body.appendChild(modalContainer);
    }
}

function removeOverlay() {
    console.log('Removing overlay');
    document.getElementById('simplemodal-overlay')?.remove();
    document.getElementById('simplemodal-container')?.remove();
}
