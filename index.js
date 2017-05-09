const page = require('webpage').create();

page.onResourceRequested = function(request) {
    // console.log(request.method, request.url);
};
page.onResourceReceived = function(response) {
  // console.log('Receive ' + JSON.stringify(response, undefined, 4));
};
page.onConsoleMessage = function(msg) {
    const logOnlyOwnersearch = true;
    const token = 'ownersearch: ';
    if (!logOnlyOwnersearch) {
        console.log(msg);
    } else if (logOnlyOwnersearch && msg.substring(0, token.length) === token) {
        console.log(msg.substring(token.length));
    }
};

page.onLoadFinished = function() {

    page.evaluate(function() {

        if (location.pathname === '/rpp/login.html') {
            console.log('ownersearch: Logging in')

            // Fill out the form and log in
            const usernameEl = document.getElementById('j_username');
            const passwordEl = document.getElementById('j_password');
            const formEl = document.getElementsByTagName('form')[0];

            usernameEl.value = 'gerardcole';
            passwordEl.value = 'norton88';

            formEl.submit();

        } else if (location.pathname === '/rpp/dashboard.html') {
            console.log('ownersearch: Login complete')

            const searchInput = document.getElementsByName('addressSearch')[0];
            const searchButton = document.getElementById('firstAddressLink');
            searchInput.value = '707 Darling Street Rozelle NSW 2039';
            searchButton.click();

        } else if (location.pathname === '/rpp/property/detail.html') {
            console.log('ownersearch: Search complete')
            console.log('ownersearch: ' + document.title)
            const ownerName = document.getElementById('propertySearchOwnerNameLink');
            console.log('ownersearch: ownerName' + ownerName.innerHTML.trim())
        }
    });

    const title = page.evaluate(function() {
        return document.title;
    });

    console.log(title);
};

page.open('http://rpp.rpdata.com/rpp/login.html');

// waitFor('login dialog',
// function() {
//     // Check in the page if a specific element is now visible
//     return page.evaluate(function() {
//         return document.getElementById('j_username');
//         // return $("#j_username").is(":visible");
//     });
// },
// function() {
//    console.log("The sign-in dialog should be visible now.");
//    phantom.exit();
// });

function waitFor(name, checkFn, readyFn, timeout) {
    const start = new Date().getTime();
    const searchTimeout = timeout || 10000;
    const searchInterval = 250;

    var conditionMet = false;

    const interval = setInterval(function () {

        const timedOut = new Date().getTime() - start > searchTimeout;

        if (!timedOut && !conditionMet) {
            conditionMet = checkFn(); // re-check for expected element in the page
        } else if (timedOut && !conditionMet) {
            console.log('Could not find "' + name + '" before timeout!');
            phantom.exit(1);
        } else {
            const searchTime = new Date().getTime() - start;
            console.log('Found "' + name + '" in ' + searchTime + 'ms');
            readyFn(); // Do what it's supposed to do once the condition is fulfilled
            clearInterval(interval); // Stop the search
        }
    }, searchInterval);
};

// function httpGet(theUrl) {
//     const xmlHttp = new XMLHttpRequest();
//     xmlHttp.open('GET', theUrl, false); // false for synchronous request
//     xmlHttp.send(null);
//     return xmlHttp.responseText;
// }
//
// console.log(httpGet('https://rpp.rpdata.com/rpp/history/search.json'));
