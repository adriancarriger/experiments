def bar_heights(intervals, relative_probabilities, total_probability):
    heights = []
    total_relative_prob = sum(relative_probabilities)

    for i in range(0, len(relative_probabilities)):
        bar_area = (relative_probabilities[i] /
                    total_relative_prob) * total_probability
        heights.append(bar_area / (intervals[i + 1] - intervals[i]))

    return heights
