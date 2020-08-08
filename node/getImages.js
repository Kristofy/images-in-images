
const request = require('request');
const fs = require('fs');
const util = require('util');

const BASE_URL = 'https://api.thecatapi.com/v1/images/search';
const DATA = 'data/links.txt';

class Img{
    constructor(url, width, height){
        this.url = url;
        this.width = width;
        this.height = height;
    }
    stringify(){
        return `${this.url} ${this.width} ${this.height}`;
    }
}

const PAGES = 100;

let cats = [];
let promises = new Array(PAGES);
let doRequest = util.promisify(request);

function getData(){
    for(let page = 1; page <= PAGES; page++){
        const QUERYES = 'api_key=220778c1-5e96-4006-9a5d-c1a2bfb056cc&size=thumb&limit=100&page='+page;
        const URL = `${BASE_URL}?${QUERYES}`;
        console.log(URL)
            request(URL, (err, res, body) => {
            console.log(page+"is done");
            if (err) { console.log(err); }else{
                JSON.parse(body).forEach( img  => {
                    cats.push(new Img(img.url, img.width, img.height));
                });
            }
            try_process_data();
            })

    }
}

getData();
let try_process_data = (function(){
    let count = 0;

    return function(){
        count++;
        if(count === PAGES){
            process_data();
        }
    }
})();

function process_data(){
    console.log("stareted")
    fs.writeFileSync(DATA, cats.reduce((acc, c) => acc+c.stringify()+'\n', ""));
    console.log("DONE");
}


