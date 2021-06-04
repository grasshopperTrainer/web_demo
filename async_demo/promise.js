const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error('message'));
        // resolve(1);
        reject('ddd')
    }, 1000);
});

p.then().catch(err => console.log(err.message));