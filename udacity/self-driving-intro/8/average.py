
# pixels = np.float32(rgb_masked_image.reshape(-1, 3))

# n_colors = 2
# criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 200, .1)
# flags = cv2.KMEANS_RANDOM_CENTERS

# _, labels, palette = cv2.kmeans(pixels, n_colors, None, criteria, 10, flags)
# _, counts = np.unique(labels, return_counts=True)

# print("kmeans", palette)

# indices = np.argsort(counts)[::-1]
# freqs = np.cumsum(np.hstack([[0], counts[indices]/counts.sum()]))
# rows = np.int_(rgb_masked_image.shape[0]*freqs)

# dom_patch = np.zeros(shape=rgb_masked_image.shape, dtype=np.uint8)
# for i in range(len(rows) - 1):
#     dom_patch[rows[i]:rows[i + 1], :, :] += np.uint8(palette[indices[i]])


# fig, (ax0, ax1) = plt.subplots(1, 2, figsize=(12, 6))
# # ax0.imshow(avg_patch)
# ax0.set_title('Average color')
# ax0.axis('off')
# ax1.imshow(dom_patch)
# ax1.set_title('Dominant colors')
# ax1.axis('off')
# plt.show(fig)
