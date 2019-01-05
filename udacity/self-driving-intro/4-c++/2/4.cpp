// g++ 4.cpp -o main -std=c++11 && ./main

#include <iostream>
#include <vector>

int main() {
  std::vector<double> myvector = {5.0, 3.0, 2.7, 8.2, 7.9};
  std::cout << myvector[0] + myvector[2] << std::endl;

  return 0;
}
