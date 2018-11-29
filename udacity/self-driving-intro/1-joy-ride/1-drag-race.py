import time

from Car import Car

def jump(car):
  # Defaults ⚙
  car.steer(0.0)

  # Backup 🔙
  car.gas(-1.0)
  time.sleep(.4)

  # Race! 🏃
  car.gas(1.0)
  time.sleep(17.3)

  # Slow down 😟
  car.gas(-1)
  time.sleep(3.5)

  # Stop (kinda 😉)
  car.gas(-.148)

car = Car()
jump(car)
