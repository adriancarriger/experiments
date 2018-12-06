def probability_range_improved(low_range, high_range, minimum, maximum):
    if (isinstance(low_range, str) or isinstance(high_range, str)):
        print('Inputs should be numbers not string')
        return None

    if (minimum > low_range or low_range > maximum):
        print('Your low range value must be between minimum and maximum')
        return None

    if (minimum > high_range or high_range > maximum):
        print('The high range value must be between minimum and maximum')
        return None

    return abs(high_range - low_range) / (maximum - minimum)
