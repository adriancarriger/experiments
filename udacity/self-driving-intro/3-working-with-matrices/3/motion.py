# The predict_state function should take in a state
# and a change in time, dt (ex. 3 for 3 seconds)
# and it should output a new, predicted state
# based on a constant motion model
# This function also assumes that all units are in m, m/s, s, etc.


def predict_state(state, dt):
    [position, velocity] = state
    return [position + velocity * dt, velocity]


test_state = [10, 3]
test_dt = 5

test_output = predict_state(test_state, test_dt)
