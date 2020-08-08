const fs = require('fs');
const sharp = require('sharp');
const request = require('request');
const https = require('https');

const N = 9900;
const UNIFORM_SIZE = 50;

class Img{
    constructor(url, width, height){
        this.url = url;
        this.width = width;
        this.height = height;
    }
    getnewH(){
        if(this.height>this.width){
            return Math.floor((this.height/this.width)*UNIFORM_SIZE);
        }else{
            return UNIFORM_SIZE;
        }
    }

    getnewW(){
        if(this.width> this.height){
            return Math.floor((this.width/this.height)*UNIFORM_SIZE);
        }else{
            return UNIFORM_SIZE;
        }
    }
}

let cats = new Array(N);
let size = 0;
(fs.readFileSync('data/links.txt',{encoding:'utf8', flag:'r'})).split('\n').forEach((e) => {
    let m = e.split(" ");
    if(!m[0].endsWith('.gif') &&  parseInt(m[1], 10) <= 1280 && parseInt(m[2], 10) <= 1280){
        cats[size++] = new Img(m[0], parseInt(m[1], 10), parseInt(m[2], 10));
    }
});

let index = 0;
let in2 = 0;

let all = 7000;
function download(cat, filename){
    const file = fs.createWriteStream(filename);
    const request = https.get(cat.url, function(response) {
        const stream = response.pipe(file);
        stream.on("finish", ()=>{process_data(filename, cat)});
       
   // process_data(filename, cat);
    });
    //request.on("finish", ()=>{process_data(filename, cat);});
}



function download_data(){
 //   console.log(Symbol('connect-options'));
 //   console.log("data processing started");
//  cats = cats.splice(0, size);
    cats.slice(0, 7000).forEach((cat)=>{
            
            let name = 'cat-'+ in2++ +'.jpg';
            setTimeout(()=>{download(cat, name)}, 300*in2);

    });

}

function process_data(filename, cat){
    //console.log(cat.url)
    sharp(filename)
    .resize(cat.getnewW(), cat.getnewH())
    .extract({
        width: UNIFORM_SIZE,
        height: UNIFORM_SIZE,
        left: Math.floor((cat.getnewW()-UNIFORM_SIZE)/2),
        top: Math.floor((cat.getnewH()-UNIFORM_SIZE)/2)
    })
    .toFile("data/cat"+index++ +".jpg")
        .then(function(new_file_info) {
            console.log("Image cropped and saved");
            fs.unlinkSync(filename);
            console.log(--all + " left");
        })
        .catch(function(err) {
            console.log("An error occured");
            fs.unlinkSync(filename);
            console.log(--all + " left");
        });

}

download_data();
