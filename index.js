'use strict'

function formatRequest(userHandle) { ;
    const requestFormat = `https://api.github.com/users/${userHandle}/repos`;
    return requestFormat;
}

function displayResults(responseJson) {
    console.log('rendering repos')
    $('#results-list').empty();
    for (let i = 1; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h3><p>${responseJson[i].name}</p><a href="${responseJson[i].html_url}">Link to Repo</a></h3>`
        )
    };
    $('#results').removeClass('hidden');
}

function getRepos (userHandle) {
    console.log('Fetching Repo List')
    const fetchURL = formatRequest(userHandle);
    fetch(fetchURL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>     
            displayResults(responseJson));
        };
        //.catch(err => {
           // alert('Something went wrong!')

function watchForm() {
    $('form').submit( e => {
        e.preventDefault();
        const userHandle = $('#js-user-handle').val();
        console.log('watch form ran');
        getRepos(userHandle);
    })
}

$(watchForm);