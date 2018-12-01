car_parameters = {"throttle": 0, "steer": 0, "brake": 0}

def control(pos_x, pos_y, time, velocity):
    """ Controls the simulated car"""
    global car_parameters

    if pos_x < 125.8 and pos_y > 35:
        car_parameters['throttle'] = -1
        car_parameters['steer'] = 5
    elif pos_x < 130 and pos_y > 32.5:
        car_parameters['throttle'] = -1
        car_parameters['steer'] = -5
    elif pos_y < 32.2:
        car_parameters['throttle'] = 1
        car_parameters['steer'] = 0
    else:
        car_parameters['throttle'] = 0
        car_parameters['steer'] = 0
        car_parameters['brake'] = 1

    return car_parameters

import src.simulate as sim
sim.run(control)
