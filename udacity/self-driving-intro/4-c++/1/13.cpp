#include <iostream>

double distance(double velocity, double acceleration, double time);

int main() {
  std::cout << distance(3, 4, 5) << std::endl;
  std::cout << distance(7.0, 2.1, 5.4) << std::endl;

  return 0;
}

double distance(double velocity, double acceleration, double time) {
  double half = 0.5;
  return velocity * time + half * acceleration * time * time;
}
