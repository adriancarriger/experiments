def initial_grid(rows, columns):
    default_probability = 1 / (rows * columns)

    grid = []

    for i in range(0, rows):
        grid.append([])
        for j in range(0, columns):
            grid[i].append(default_probability)

    return grid


def probability(grid, row, column):
    return grid[row][column]


def update_probability(grid, update_list):
    for [[x, y], update] in update_list:
        grid[x][y] = update

    return grid
