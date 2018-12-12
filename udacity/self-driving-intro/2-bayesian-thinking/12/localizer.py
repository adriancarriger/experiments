# import pdb
from helpers import normalize, blur


def initialize_beliefs(grid):
    height = len(grid)
    width = len(grid[0])
    area = height * width
    belief_per_cell = 1.0 / area
    beliefs = []
    for i in range(height):
        row = []
        for j in range(width):
            row.append(belief_per_cell)
        beliefs.append(row)
    return beliefs


def sense(color, grid, beliefs, p_hit, p_miss):
    # print('\n=> Before')
    # log_data(color, grid, beliefs, p_hit, p_miss)
    new_beliefs = []

    total_probability = 0
    for i in range(len(beliefs)):
        new_beliefs.append([])
        for j in range(len(beliefs[i])):
            if color == grid[i][j]:
                new_beliefs[i].append(beliefs[i][j] * p_hit)
            else:
                new_beliefs[i].append(beliefs[i][j] * p_miss)
            total_probability += new_beliefs[i][j]

    for i in range(len(new_beliefs)):
        for j in range(len(new_beliefs[i])):
            new_beliefs[i][j] = new_beliefs[i][j] / total_probability

    # print('\n=> After')
    # show_rounded_beliefs(new_beliefs)
    # print('\n')

    return new_beliefs


def move(dy, dx, beliefs, blurring):
    height = len(beliefs)
    width = len(beliefs[0])
    new_G = [[0.0 for i in range(width)] for j in range(height)]
    for i, row in enumerate(beliefs):
        for j, cell in enumerate(row):
            new_i = (i + dy) % height
            new_j = (j + dx) % width
            # pdb.set_trace()
            new_G[int(new_i)][int(new_j)] = cell
    return blur(new_G, blurring)


def log_data(color, grid, beliefs, p_hit, p_miss):
    print('\nGrid')
    for row in grid:
        print(row)

    show_rounded_beliefs(beliefs)
    print('\ncolor', color, '\np_hit', p_hit, '\np_miss', p_miss)


def show_rounded_beliefs(beliefs):
    print('\nBeliefs')
    for row in beliefs:
        for belief in row:
            print("{:0.3f}".format(belief), end="  ")
        print()
