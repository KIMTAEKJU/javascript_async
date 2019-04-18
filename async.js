
const wget1 = (url, callback) => {
    console.log( 'wget1 [' + url + ']' );
    setTimeout( () => {
        const response = {
            data: 'hello world'
        }

        callback(response);
    }, 3000);
}

const wget2 = url => {
    console.log( 'wget2 [' + url + ']' );
    return new Promise( (resolve, reject) => 
        setTimeout( () => {
            const response = {
                data: 'hello world2'
            }
    
            //resolve(response);
            reject( 'fail = wget2');
        }, 2000)
    );
}

// async를 쓰면 비동기함수라는것이라 생각하고 암묵적으로 promise 객체를 리턴한다 reject가 일어나면 예외가 발생 catch를 쓰면안되고 try catch를 사용해야함

const _fetch = async url => {
    
    try{
        console.log( '_fetch [' + url + ']' );
        let response = await wget2(url); // await을 쓰면 pending이 리턴되는게아니라 저 비동기함수를 처리한 값이 들어옴
        return response;
    } catch(err){
        console.error(err);
    }
    
    //async는 프로미스 객체를 재사용할때 사용
    // await setTimeout( () => { // 여기를 기다려주는 구문을 사용해야함 async는  await은 async 내부에서만 사용가능 그리고 await을 쓰는 함수는 비동기 함수여야한다(promise를 리턴하는)
    //     response = {
    //         data: 'hello world2'
    //     }

    // }, 1000);
}

wget1( 'http://www.kickscar.com/api', response => console.log(response) );

wget2( 'http://www.kickscar.com/api2')
.then( response => console.log(response) )
.catch( err => console.error(err) ); // reject로 오면 catch로 받음

_fetch( 'http://www.kickscar.com/api3')
.then( response => console.log(response) );

console.log('do something');