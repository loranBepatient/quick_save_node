console.log('before');

// getUser(1)
//     .then(user => getRepositories(user.username))
//     .then(repositories => console.log(repositories));


async function displayCommit () {
    try { 
        let user = await getUser(1)
        let repositories =  await getRepositories(user.username)
    
        return repositories
    }
    catch (err) { 
       console.error(err)
    }
}

let x 
displayCommit()
    .then(commits => console.log(commits))


console.log('after');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from a database');
            let user = {
                id: id,
                githubName: 'Mosh'
            };
            resolve(user);
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github api..');
            resolve(['repo1', 'repo2', 'repo3']);
            // reject(new Error('could not get the repos'))
        }, 2000);
    });
}
