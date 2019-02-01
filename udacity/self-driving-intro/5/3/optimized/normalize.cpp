#include "headers/normalize.h"
using namespace std;

vector<vector<float> > normalize(vector<vector<float> > &grid) {
  float total = 0.0;
  static int height = grid.size();
  static int width = grid[0].size();

  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      total += grid[i][j];
    }
  }

  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      grid[i][j] = grid[i][j] / total;
    }
  }

  return grid;
}
