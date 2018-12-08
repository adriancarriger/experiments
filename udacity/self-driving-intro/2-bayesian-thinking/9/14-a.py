def initialize_robot(grid_size):
    grid = []
    base = 1 / grid_size

    for i in range(0, grid_size):
        grid.append(base)

    return grid


def grid_probability(grid, position):
    if position < 0 or position > len(grid):
        return None

    return grid[position]
