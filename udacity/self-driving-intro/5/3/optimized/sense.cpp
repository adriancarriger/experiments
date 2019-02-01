#include "headers/sense.h"

using namespace std;

vector<vector<float> > sense(char color, vector<vector<char> > &grid,
                             vector<vector<float> > &beliefs, float p_hit, float p_miss) {
  for (int i = 0; i < grid.size(); i++) {
    for (int j = 0; j < grid[0].size(); j++) {
      beliefs[i][j] = beliefs[i][j] * grid[i][j] == color ? p_hit : p_miss;
    }
  }

  return beliefs;
}
