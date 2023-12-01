const observeDOM = (function () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    return function (obj, callback) {
        if (!obj || obj.nodeType !== 1) return;

        if (MutationObserver) {
            // define a new observer
            var mutationObserver = new MutationObserver(callback)

            // have the observer observe for changes in children
            mutationObserver.observe(obj, {childList: true, subtree: true})
            return mutationObserver
        }

        // browser support fallback
        else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false)
            obj.addEventListener('DOMNodeRemoved', callback, false)
        }
    }
})();

const elem = document.getElementById('api');
changeElements();
observeDOM(elem, function (m) {
    changeElements();
});

function changeElements() {
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
}
