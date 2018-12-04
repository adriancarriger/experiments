import numpy as np

world = np.array([['o', 'b', 'o', 'o', 'b'],
                  ['o', 'o', 'b', 'o', 'o'],
                  ['b', 'o', 'o', 'b', 'o'],
                  ['b', 'o', 'o', 'o', 'o']])

measurement = ['b', 'o']


def find_match(world, measurement):
    possible_locations = []
    max_index = world.shape[1] - 1

    for i in range(0, world.shape[0]):
        for j in range(0, world.shape[1]):
            if j + 1 <= max_index:
                current = [world[i][j], world[i][j + 1]]
                if current[0] == measurement[0] and current[1] == measurement[1]:
                    possible_locations.append([i, j])

    return possible_locations


locations = find_match(world, measurement)
