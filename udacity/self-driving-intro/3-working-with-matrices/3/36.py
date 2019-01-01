# TODO: Write a function called inverse_matrix() that
# receives a matrix and outputs the inverse
###
# You are provided with start code that checks
# if the matrix is square and if not, throws an error
###
# You will also need to check the size of the matrix.
# The formula for a 1x1 matrix and 2x2 matrix are different,
# so your solution will need to take this into account.
###
# If the user inputs a non-invertible 2x2 matrix or a matrix
# of size 3 x 3 or greater, the function should raise an
# error. A non-invertible
# 2x2 matrix has ad-bc = 0 as discussed in the lesson
###
# Python has various options for raising errors
###       raise RuntimeError('this is the error message')
###       raise NotImplementedError('this functionality is not implemented')
###       raise ValueError('The denominator of a fraction cannot be zero')


def inverse_matrix(matrix):

    inverse = []

    if len(matrix) != len(matrix[0]):
        raise ValueError('The matrix must be square')

    if len(matrix) > 2:
        raise ValueError('The matrix cannot be greater than 2')

    if len(matrix) == 1:
        inverse.append([1 / matrix[0][0]])

    # TODO: Check if matrix is 1x1 or 2x2.
    # Depending on the matrix size, the formula for calculating
    # the inverse is different.
    # If the matrix is 2x2, check that the matrix is invertible

    # TODO: Calculate the inverse of the square 1x1 or 2x2 matrix.

    return inverse
