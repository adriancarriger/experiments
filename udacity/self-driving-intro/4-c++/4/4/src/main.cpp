#include <iostream>
#include "gaussian.h"

using namespace std;

int main() {
  /*
 TODO: Instantiate a Gaussian object called gaussianone.The object
 should have mean = 40.0 and variance (aka sigma2) = 225.0
 */
  Gaussian gaussianone(40.0, 225.0);

  /*
  TODO: Instantiate another Gaussian object called gaussiantwo.
  The object should have mean = 35.6 and variance = 12.25
  */
  Gaussian gaussiantwo(35.6, 12.25);

  /*
  TODO:
  Output to the terminal the following (hint: use the std namespace with cout or
  use std::cout):
  - the probability density function value for gaussianone when x = 10.5
  - the probability density function value for gaussianone when x = 55.4
  - the probability density function value for gaussiantwo when x = 35.6
  - the probability density function value for gaussiantwo when x = 29.4
  */
  cout << gaussianone.evaluate(10.5) << "\n";
  cout << gaussianone.evaluate(55.4) << "\n";
  cout << gaussiantwo.evaluate(35.6) << "\n";
  cout << gaussiantwo.evaluate(29.4) << "\n";

  /*
  TODO:
  - Change the mean value of gaussianone to mean = 45
  - Change the variance of gaussiantwo to variance = 15.4
  - Output the mean of gaussianone to the terminal
  - Output the variance of gaussiantwo to the terminal
  */
  gaussianone.setMu(45.0);
  gaussiantwo.setSigma2(15.4);

  cout << gaussianone.getMu() << "\n";
  cout << gaussiantwo.getSigma2() << "\n";

  /*
  TODO:
  - Multiply gaussian one and gaussian two. Store the resulting gaussian
  in a variable called gaussianthree
  - Output the mean and variance of gaussianthree to the terminal
  - Add gaussian one and gaussian two. Store the resulting gaussian in a
  variable called gaussianfour
  - Output the mean and variance of gaussianfour to the terminal
  */
  Gaussian gaussianthree = gaussianone.mul(gaussiantwo);
  cout << gaussianthree.getMu() << "\n";
  cout << gaussianthree.getSigma2() << "\n";

  Gaussian gaussianfour = gaussianone.add(gaussiantwo);
  cout << gaussianfour.getMu() << "\n";
  cout << gaussianfour.getSigma2() << "\n";
}
