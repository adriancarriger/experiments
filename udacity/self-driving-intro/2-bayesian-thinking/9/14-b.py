def output_map(grid):
    x_labels = []
    for i in range(0, len(grid)):
        x_labels.append(i)
    x = x_labels

    print(x)
    print(grid)

    plt.bar(x, grid)
    plt.xlabel('Grid space')
    plt.ylabel('Probability')
    plt.title('Probability of the robot being at each space on the grid')
    plt.xticks(x_labels)
    plt.show()


def update_probabilities(grid, updates):
    for i in range(0, len(updates)):
        [update_index, update] = updates[i]
        grid[update_index] = update

    return grid
