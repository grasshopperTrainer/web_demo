const Joi = require("joi");

console.log('Before');
// getUser(1)
//     .then(user => getRepositories(user))
//     .then(repos => console.log(repos))
//     .catch(err => console.log(err.message));

async function displayCommits() {
    try {
        const user = await getUser(2);
        const repos = await getRepositories(user);
        console.log(repos);
    } catch (err) {
        console.log('Error', err.message);
    }
}
displayCommits()
console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, name: 'ki'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([username, 'repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}