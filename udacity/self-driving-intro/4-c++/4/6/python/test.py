from helpers import blur

new_G = [[0 for i in range(3)] for j in range(3)]
new_G[1][1] = 1
print(blur(new_G, 0.12))
