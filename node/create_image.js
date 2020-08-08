const fs = require('fs');
const sharp = require('sharp');
const readline = require("readline");
const sizeof = require('image-size');
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let new_width;
let new_height;
const res = 50;

const pattern = /^\d+\s\d+$/;

class Img{
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
    getnewH(){
        if(this.width * new_height / this.height < new_width){
            return Math.floor(this.height * new_width / this.width);
        }else{
            return new_height;
        }
    }

    getnewW(){
        if(this.width * new_height / this.height < new_width){
            return new_width;
        }else{
            return Math.floor(this.width * new_height / this.height);
        }
    }
}

read.question("The picture name: ", function(path){
    try{
        if(fs.existsSync(path)){
            let dimensions = sizeof(path);
            read.question(`New Size (${dimensions.width}x${dimensions.height}): `, function(dim){
                if(pattern.test(dim)){
                    [new_width, new_height] = dim.split(' ').map(x => parseInt(x, 10));
                    if(new_width > 0 && new_width % res == 0 && new_height > 0 && new_height % res == 0){
                        process_data(path, new Img(dimensions.width,dimensions.height));
                    }else{
                        console.log("Error, width and hight should be a positive multiple of "+ res + "!");
                        process.exit(1);
                    }
                }else{
                    console.log("Error, size should be in the following pattern: \"width height\" (without the quotes)[all positive integers]!");
                    process.exit(1);
                }
            });
        }else{
            console.log("Error, " + path + " does not exist!");
            process.exit(1);
        }
    }catch(err){
        console.log("Error, opening " + path);
        console.error(err);
        process.exit(1);
    }

});

function process_data(filename, img){
    sharp(filename)
    .resize(img.getnewW(), img.getnewH())
    .extract({
        width: new_width,
        height: new_height,
        left: Math.floor((img.getnewW()-new_width)/2),
        top: Math.floor((img.getnewH()-new_height)/2)
    })
    .toFile("data/bigger.jpg")
        .then(function(new_file_info) {
            console.log("Image cropped and saved");
            process.exit(0);
        })
        .catch(function(err) {
            console.log("An error occured");
            process.exit(1);
        });

}


