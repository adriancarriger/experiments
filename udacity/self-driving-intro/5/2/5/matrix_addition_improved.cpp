#include "matrix_addition_improved.h"

using namespace std;

vector<vector<int> > matrix_addition_improved(vector<vector<int> > matrixa,
                                              vector<vector<int> > matrixb) {
  // store the number of rows and columns in the matrices
  vector<int>::size_type rows_a = matrixa.size();
  vector<int>::size_type cols_a = matrixa[0].size();
  vector<int>::size_type cols_b = matrixb[0].size();

  // if both matrices have the same size, calculate and return the sum
  // otherwise check if the number of rows and columns are not equal and return a matrix of zero
  if (rows_a == matrixb.size() && cols_a == cols_b) {
    vector<vector<int> > matrix_sum(rows_a, vector<int>(cols_a));

    for (unsigned int i = 0; i < rows_a; i++) {
      for (unsigned int j = 0; j < cols_a; j++) {
        matrix_sum[i][j] = matrixa[i][j] + matrixb[i][j];
      }
    }

    return matrix_sum;
  } else {
    return vector<vector<int> >(rows_a, vector<int>(cols_b));
  }
}
