#include "headers/blur.h"
#include "headers/zeros.h"

using namespace std;

vector<vector<float>> blur(vector<vector<float>> &grid, float blurring) {
  vector<float> row;
  vector<float> newRow;

  unsigned long height;
  unsigned long width;
  float center, corner, adjacent;

  height = grid.size();
  width = grid[0].size();

  center = 1.0 - blurring;
  corner = blurring / 12.0;
  adjacent = blurring / 6.0;

  static vector<vector<float>> window{
      {corner, adjacent, corner}, {adjacent, center, adjacent}, {corner, adjacent, corner}};

  static vector<int> DX{-1, 0, 1};
  static vector<int> DY{-1, 0, 1};

  unsigned long new_i;
  unsigned long new_j;

  vector<vector<float>> newGrid = zeros(height, width);

  for (unsigned long i = 0; i < height; i++) {
    for (unsigned long j = 0; j < width; j++) {
      for (unsigned long ii = 0; ii < 3; ii++) {
        for (unsigned long jj = 0; jj < 3; jj++) {
          new_i = (i + DY[ii] + height) % height;
          new_j = (j + DX[jj] + width) % width;
          newGrid[new_i][new_j] += grid[i][j] * window[ii][jj];
        }
      }
    }
  }

  return newGrid;
}
