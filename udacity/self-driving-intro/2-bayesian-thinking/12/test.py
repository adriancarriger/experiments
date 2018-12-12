# from './localizer' import localizer
import localizer
import helpers


def test_sense():
    R = 'r'
    _ = 'g'

    simple_grid = [
        [_, _, _],
        [_, R, _],
        [_, _, _]
    ]

    p = 1.0 / 9
    initial_beliefs = [
        [p, p, p],
        [p, p, p],
        [p, p, p]
    ]

    observation = R

    expected_beliefs_after = [
        [1/11, 1/11, 1/11],
        [1/11, 3/11, 1/11],
        [1/11, 1/11, 1/11]
    ]

    p_hit = 3.0
    p_miss = 1.0
    beliefs_after_sensing = localizer.sense(
        observation, simple_grid, initial_beliefs, p_hit, p_miss)

    if helpers.close_enough(beliefs_after_sensing, expected_beliefs_after):
        print("Tests pass! Your sense function is working as expected")
        return

    elif not isinstance(beliefs_after_sensing, list):
        print("Your sense function doesn't return a list!")
        return

    elif len(beliefs_after_sensing) != len(expected_beliefs_after):
        print("Dimensionality error! Incorrect height")
        return

    elif len(beliefs_after_sensing[0]) != len(expected_beliefs_after[0]):
        print("Dimensionality Error! Incorrect width")
        return

    elif beliefs_after_sensing == initial_beliefs:
        print("Your code returns the initial beliefs.")
        return

    total_probability = 0.0
    for row in beliefs_after_sensing:
        for p in row:
            total_probability += p
    if abs(total_probability-1.0) > 0.001:

        print("Your beliefs appear to not be normalized")
        return

    print("Something isn't quite right with your sense function")


test_sense()
