import numpy as np

from car import Car

height = 4
width = 6
world = np.zeros((height, width))

# Setup
initial_position = [0, 0]
velocity = [0, 1]

carla = Car(initial_position, velocity, world)

height = 4
width = 6
world = np.zeros((height, width))

initial_position = [0, 0]
velocity = [0, 1]

carla = Car(initial_position, velocity, world)

# Drive
for i in range(4):
    carla.move()
    carla.move()
    carla.move()
    carla.turn_right()

carla.display_world()
