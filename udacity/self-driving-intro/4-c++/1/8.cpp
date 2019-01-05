#include <iostream>

int main() {
  // TODO: define two floating point numbers. Assign 12.07 to the
  // first floating point number. Assign 65.102 to the
  // second floating point number.
  float first_number = 12.07;
  float second_number = 65.102;

  // TODO: Calculate the sum of the two floating point variables into
  // the float_sum variable.
  float float_sum = first_number + second_number;
  std::cout << float_sum << std::endl;

  // TODO: Calculate difference between the second and first number
  // output the results to cout.
  std::cout << second_number - first_number << std::endl;

  // TODO: Calculate second_float / first_float and output the results
  // to cout.
  std::cout << second_number / first_number << std::endl;

  // TODO: Calculate the product of the two numbers and output the results
  // to cout.
  std::cout << second_number * first_number << std::endl;

  return 0;
}
