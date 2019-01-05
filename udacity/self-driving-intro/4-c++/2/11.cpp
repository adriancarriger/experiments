#include <iostream>
#include <string>
#include <vector>

using namespace std;

void matrixprint(vector<vector<int>> input);
vector<vector<int>> matrixsum(vector<vector<int>> matrixA, vector<vector<int>> matrixB);

int main() {
  vector<vector<int>> matrixA(5, vector<int>(3, 2));
  vector<vector<int>> matrixB(5, vector<int>(3, 26));

  matrixprint(matrixsum(matrixA, matrixB));

  return 0;
}

vector<vector<int>> matrixsum(vector<vector<int>> matrixA, vector<vector<int>> matrixB) {
  vector<vector<int>> matrix_sum_result(matrixA.size(), vector<int>(matrixA[0].size(), 0));
  for (int i = 0; i < matrixA.size(); i++) {
    for (int j = 0; j < matrixA[i].size(); j++) {
      matrix_sum_result[i][j] = matrixA[i][j] + matrixB[i][j];
    }
  }
  return matrix_sum_result;
}

void matrixprint(vector<vector<int>> input) {
  for (int i = 0; i < input.size(); i++) {
    for (int j = 0; j < input[i].size(); j++) {
      cout << input[i][j] << " ";
    }
    cout << endl;
  }
}
