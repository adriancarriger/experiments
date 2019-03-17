def in_range(image, lower, upper):
    in_range = cv2.inRange(image, np.array(lower), np.array(upper))

    return cv2.countNonZero(in_range)


def classify_position(input_image):
    # Convert to HSV
    hsv = cv2.cvtColor(input_image, cv2.COLOR_RGB2HSV)

    # HSV channels
    h = hsv[:, :, 0]
    s = hsv[:, :, 1]
    v = hsv[:, :, 2]

    # HSV mask
    hsv_lower = np.array([0, 0, 0])
    hsv_upper = np.array([255, 35, 255])
    hsv_mask = cv2.inRange(hsv, hsv_lower, hsv_upper)
    masked_image = np.copy(input_image)
    masked_image[hsv_mask != 0] = [0, 0, 0]

    # Histogram
    s_sum = np.sum(s[:, :], axis=1)
    vertical_crop = 6
    s_sum = s_sum[vertical_crop:-vertical_crop]
    group_size = int(np.ceil(len(s_sum) / 3))
    first_third = np.sum(s_sum[:group_size])
    middle_third = np.sum(s_sum[group_size:group_size * 2])
    last_third = np.sum(s_sum[-group_size:])

    stats = {
        'green': last_third,
        'red': first_third,
        'yellow': middle_third
    }
    classification = max(stats, key=stats.get)

    total = first_third + middle_third + last_third
    confidence = stats[classification] / total

    return (classification, confidence)


# Testing with 1, 3, 4, 20, 750, 751, 800
image_num = 10
test_im = STANDARDIZED_LIST[image_num][0]
test_label = STANDARDIZED_LIST[image_num][1]

classify_image(test_im)
