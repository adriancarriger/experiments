#ifndef SENSE_H
#define SENSE_H

#include <iostream>
#include <vector>

std::vector<std::vector<float> > sense(char color, std::vector<std::vector<char> > &grid,
                                       std::vector<std::vector<float> > &beliefs, float p_hit,
                                       float p_miss);

#endif /* SENSE.H */
