#include "headers/move.h"
#include "headers/zeros.h"

using namespace std;

vector<vector<float> > move(int dy, int dx, vector<vector<float> > &beliefs) {
  unsigned long height = beliefs.size();
  unsigned long width = beliefs[0].size();

  vector<vector<float> > newGrid = zeros(height, width);

  for (unsigned long i = 0; i < height; i++) {
    for (unsigned long j = 0; j < width; j++) {
      newGrid[(i + dy + height) % height][(j + dx + width) % width] = beliefs[i][j];
    }
  }

  return newGrid;
}
