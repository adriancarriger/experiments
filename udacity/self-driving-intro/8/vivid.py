# Testing with 1, 3, 20, 750, 800
image_num = 3
test_im = STANDARDIZED_LIST[image_num][0]
test_label = STANDARDIZED_LIST[image_num][1]

# Convert to HSV
hsv = cv2.cvtColor(test_im, cv2.COLOR_RGB2HSV)

# HSV channels
h = hsv[:, :, 0]
s = hsv[:, :, 1]
v = hsv[:, :, 2]

s = s * 2
vivid_hsv = cv2.merge((h, s, v))
vivid = cv2.cvtColor(vivid_hsv, cv2.COLOR_HSV2RGB)

# HSV mask
hsv_lower = np.array([0, 0, 0])
hsv_upper = np.array([255, 35, 255])
hsv_mask = cv2.inRange(hsv, hsv_lower, hsv_upper)
masked_image = np.copy(test_im)
masked_image[hsv_mask != 0] = [0, 0, 0]

# RGB mask - black
black_max = 150
rgb_lower = np.array([0, 0, 0])
rgb_upper = np.array([black_max, black_max, black_max])
rgb_mask = cv2.inRange(masked_image, rgb_lower, rgb_upper)
rgb_masked_image = np.copy(test_im)
rgb_masked_image[rgb_mask != 0] = [0, 0, 0]


# RGB mask - white
white_min = 200
rgb_lower = np.array([white_min, white_min, white_min])
rgb_upper = np.array([255, 255, 255])
rgb_mask = cv2.inRange(rgb_masked_image, rgb_lower, rgb_upper)

rgb_masked_image[rgb_mask != 0] = [0, 0, 0]


# Plot
f, (ax1, ax2, ax3, ax4) = plt.subplots(1, 4, figsize=(20, 10))
ax1.set_title('Standardized image')
ax1.imshow(rgb_masked_image, cmap='gray')
ax2.set_title('H channel')
ax2.imshow(masked_image, cmap='gray')
ax3.set_title('S channel')
ax3.imshow(s, cmap='gray')
ax4.set_title('V channel')
ax4.imshow(vivid, cmap='gray')
