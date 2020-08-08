#include <bits/stdc++.h>

using namespace std;

const int SIZE=9;

int tmp[SIZE];
int arr[SIZE];
int index;
void rot();
void flip();
void print_array(int config);
ofstream fout;

int main()
{
  fstream fin("../values.txt");
  fout.open("../populated_values.txt");
  while(!fin.eof()){
    fin >> index;
    for(int i = 0; i < SIZE; i++){
      fin >> arr[i];
    }

    // normal
    print_array(0);

    // turn 1
    rot();
    print_array(1);

    // turn 2
    rot();
    print_array(2);

    // turn 3
    rot();
    print_array(3);

    // flip vertical
    rot(); // back to start;
    flip();
    print_array(4);

    // flip diagnal right
    rot();
    print_array(5);

    // flip horizontal
    rot();
    print_array(6);

    // flip diagnal left
    rot();
    print_array(7);

    printf("%dth is done!\n", index);
  }

  fin.close();
  fout.close();



  return 0;
}

void print_array(int config){
  fout<<index<<" "<<config;
  for(int i = 0; i < SIZE; i++){
    fout<<" "<<arr[i];
  }
  fout<<endl;
}

void rot(){
  tmp[0] = arr[6];
  tmp[1] = arr[3];
  tmp[2] = arr[0];
  tmp[3] = arr[7];
  tmp[4] = arr[4];
  tmp[5] = arr[1];
  tmp[6] = arr[8];
  tmp[7] = arr[5];
  tmp[8] = arr[2];

  memcpy(arr, tmp, sizeof(int) * SIZE);

}

void flip(){

  tmp[0] = arr[2];
  tmp[1] = arr[1];
  tmp[2] = arr[0];
  tmp[3] = arr[5];
  tmp[4] = arr[4];
  tmp[5] = arr[3];
  tmp[6] = arr[8];
  tmp[7] = arr[7];
  tmp[8] = arr[6];

  memcpy(arr, tmp, sizeof(int) * SIZE);

}






