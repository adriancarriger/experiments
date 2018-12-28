# The current predict state function
# Predicts the next state based on a motion model


def predict_state(state, dt):
    tx_matrix = matrix.Matrix([[1, dt],
                               [0, 1]])

    return tx_matrix * state
