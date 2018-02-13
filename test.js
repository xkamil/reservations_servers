let d1 = new Date();



let d3 = new Date();

setTimeout(()=>{
    let d2 = new Date();

    console.log(d1 === d3);
},3000);


console.log((new Date()).getTime());