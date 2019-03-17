# Convert and image to HSV colorspace
# Visualize the individual color channels

# Testing with 1, 3, 20, 750, 800
image_num = 1

test_im = STANDARDIZED_LIST[image_num][0]
test_label = STANDARDIZED_LIST[image_num][1]


original_im = IMAGE_LIST[image_num][0]

yellow_image = STANDARDIZED_LIST[750][0]
green_image = STANDARDIZED_LIST[800][0]

# Convert to HSV
blur_amount = 5
# blured = cv2.blur(test_im,(blur_amount,blur_amount))
hsv = cv2.cvtColor(test_im, cv2.COLOR_RGB2HSV)

# Print image label
print('Label [red, yellow, green]: ' + str(test_label))

# HSV channels
h = hsv[:, :, 0]
s = hsv[:, :, 1]
v = hsv[:, :, 2]

# Plot the original image and the three channels
f, (ax1, ax2, ax3, ax4) = plt.subplots(1, 4, figsize=(20, 10))
ax1.set_title('Standardized image')
# ax1.imshow(test_im)
ax2.set_title('H channel')
ax2.imshow(h, cmap='gray')
ax3.set_title('S channel')
ax3.imshow(s, cmap='gray')
ax4.set_title('V channel')
ax4.imshow(v, cmap='gray')


# gray = cv2.cvtColor(test_im, cv2.COLOR_BGR2GRAY)
# blur = cv2.GaussianBlur(s,(5,5),0)
# th3 = cv2.adaptiveThreshold(blur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

# th3 = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)


# HSV mask
lower = np.array([0, 0, 0])
upper = np.array([255, 20, 255])

mask = cv2.inRange(hsv, lower, upper)


masked_image = np.copy(test_im)
masked_image[mask != 0] = [0, 0, 0]


# masked_with_blur = cv2.bilateralFilter(masked_image, 9, 50, 50)
# masked_with_blur = cv2.GaussianBlur(masked_image,(5,5),0)


ax2.imshow(masked_image, cmap='gray')


# RGB mask
black_max = 120
rgb_lower = np.array([0, 0, 0])
rgb_upper = np.array([black_max, black_max, black_max])

rgb_mask = cv2.inRange(masked_image, rgb_lower, rgb_upper)
rgb_masked_image = np.copy(test_im)
rgb_masked_image[rgb_mask != 0] = [0, 0, 0]


# new_s = masked_image[:,:,1]


# res = cv2.bitwise_and(test_im,test_im, mask= mask)
# mask = cv2.inRange(s, lower, upper)
# res = cv2.bitwise_and(test_im,test_im, mask= v)
# asdf = cv2.GaussianBlur(mask, (11, 11), 3)


# ax3.set_title('S channel')


ax1.imshow(rgb_masked_image, cmap='gray')
