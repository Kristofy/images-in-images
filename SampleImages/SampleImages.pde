PImage img;
PrintWriter out;
int img_size = 50;
int spacing = (50 - 15)/4;
int sample_size = 5;


void setup(){
  //size(250, 250);
  out = createWriter("values.txt");
  
  colorMode(HSB);
}
int curr = 0;
void draw(){
  if(curr == 7000){
    out.flush();
    out.close();
    noLoop();
    exit();
    return;
  }
  String s = str(curr);
  img = loadImage("./node/data/cat"+str(curr)+".jpg");
//  image(img, 0, 0); 
  int[] data = new int[sample_size*sample_size];
  for(int i = 1; i <= 3; i++){
   for(int j = 1; j <= 3; j++){
    int x = j*spacing + (j-1)*sample_size; 
    int y = i*spacing + (i-1)*sample_size; 
    img.loadPixels();
    for(int a = 0; a < sample_size; a++){
     for(int b = 0; b < sample_size; b++){
       int index = (y+a)*img_size + (x+b);
       data[a*sample_size+b] = img.pixels[index];
      // println(hex(data[a*sample_size+b]));
     }
    }
    
    data = sort(data, sample_size*sample_size);
    int middle = data[sample_size*sample_size/2];
    s +=" " + str(middle);
    //fill(middle);
    //stroke(100, 0, 0);
    
    //rect(x, y, sample_size, sample_size); 
     
    }
  }
  
  println(str(curr)+" is done");
  out.println(s);
  curr++;
 
}
