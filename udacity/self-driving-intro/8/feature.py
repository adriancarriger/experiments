def in_range(image, lower, upper):
    in_range = cv2.inRange(image, np.array(lower), np.array(upper))

    return cv2.countNonZero(in_range)


def classify_color(rgb_image):
    # Convert to HSV
    hsv = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2HSV)

    # HSV channels
    h = hsv[:, :, 0]
    s = hsv[:, :, 1]
    v = hsv[:, :, 2]

    # HSV mask
    hsv_lower = np.array([0, 0, 0])
    hsv_upper = np.array([255, 35, 255])
    hsv_mask = cv2.inRange(hsv, hsv_lower, hsv_upper)
    masked_image = np.copy(rgb_image)
    masked_image[hsv_mask != 0] = [0, 0, 0]

    # RGB mask - black
    black_max = 150
    rgb_lower = np.array([0, 0, 0])
    rgb_upper = np.array([black_max, black_max, black_max])
    rgb_mask = cv2.inRange(masked_image, rgb_lower, rgb_upper)
    rgb_masked_image = np.copy(rgb_image)
    rgb_masked_image[rgb_mask != 0] = [0, 0, 0]

    # RGB mask - white
    white_min = 200
    rgb_lower = np.array([white_min, white_min, white_min])
    rgb_upper = np.array([255, 255, 255])
    rgb_mask = cv2.inRange(rgb_masked_image, rgb_lower, rgb_upper)

    rgb_masked_image[rgb_mask != 0] = [0, 0, 0]

    red = in_range(rgb_masked_image, [200, 0, 0], [255, 200, 200])
    green = in_range(rgb_masked_image, [36, 0, 0], [86, 255, 255])
    yellow = in_range(rgb_masked_image, [153, 139, 0], [255, 255, 153])

    stats = {
        'green': green,
        'red': red,
        'yellow': yellow
    }
    classification = max(stats, key=stats.get)

    colors_found = red + green + yellow
    confidence = 0 if colors_found == 0 else stats[classification] / colors_found

    return (classification, confidence)
