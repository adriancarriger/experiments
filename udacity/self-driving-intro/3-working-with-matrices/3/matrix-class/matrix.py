import math
from math import sqrt
import numbers
from functools import reduce


def zeroes(height, width):
    """
    Creates a matrix of zeroes.
    """
    g = [[0.0 for _ in range(width)] for __ in range(height)]
    return Matrix(g)


def identity(n):
    """
    Creates a n x n identity matrix.
    """
    I = zeroes(n, n)
    for i in range(n):
        I.g[i][i] = 1.0
    return I


def dot_product(vector_one, vector_two):
    result = 0
    for i in range(len(vector_one)):
        result += vector_one[i] * vector_two[i]

    return result


class Matrix(object):

    # Constructor
    def __init__(self, grid):
        self.g = grid
        self.h = len(grid)
        self.w = len(grid[0])

    #
    # Primary matrix math methods
    #############################

    def determinant(self):
        """
        Calculates the determinant of a matrix.
        """
        if not self.is_square():
            raise(ValueError, "Cannot calculate determinant of non-square matrix.")

        if self.w == 1:
            return self.g[0][0]

        if self.w == 2:
            return (self.g[0][0] * self.g[1][1]) - (self.g[0][1] * self.g[1][0])

    def trace(self):
        """
        Calculates the trace of a matrix (sum of diagonal entries).
        """
        if not self.is_square():
            raise(ValueError, "Cannot calculate the trace of a non-square matrix.")

        return reduce((lambda total, i: total + self[i][i]), list(range(self.h)), 0)

    def inverse(self):
        """
        Calculates the inverse of a Matrix.
        """
        inverse_grid = []

        if not self.is_square():
            raise(ValueError, "Non-square Matrix does not have an inverse.")

        if self.w > 2:
            raise ValueError('The matrix cannot be greater than 2')

        if self.w == 1:
            inverse_grid.append([1 / self.g[0][0]])

        if self.w == 2:
            multiplier = 1 / self.determinant()
            inverse_grid = [
                [multiplier * self.g[1][1], multiplier * -self.g[0][1]],
                [multiplier * -self.g[1][0], multiplier * self.g[0][0]],
            ]

        return Matrix(inverse_grid)

    def T(self):
        """
        Returns a transposed copy of this Matrix.
        """
        new_grid = []
        for i in range(self.w):
            new_grid.append([])
            for j in range(self.h):
                new_grid[i].append(self[j][i])

        return Matrix(new_grid)

    def is_square(self):
        return self.h == self.w

    #
    # Begin Operator Overloading
    ############################
    def __getitem__(self, idx):
        """
        Defines the behavior of using square brackets [] on instances
        of this class.
        """
        return self.g[idx]

    def __repr__(self):
        """
        Defines the behavior of calling print on an instance of this class.
        """
        s = ""
        for row in self.g:
            s += " ".join(["{} ".format(x) for x in row])
            s += "\n"
        return s

    def __add__(self, other):
        """
        Defines the behavior of the + operator
        """
        if self.h != other.h or self.w != other.w:
            raise(ValueError, "Matrices can only be added if the dimensions are the same")

        return self.copy(lambda i, j, element: element + other[i][j])

    def __neg__(self):
        """
        Defines the behavior of - operator (NOT subtraction)
        """

        return self.copy(lambda i, j, element: -element)

    def copy(self, create_element=lambda i, j, element: element):
        """
        Creates a copy of the current matrix with optional element mutation.
            * Usage: `self.copy([lambda i, j, element: element]) -> Matrix`
        """
        new_grid = []
        for i in range(self.h):
            new_grid.append([])
            for j in range(len(self[i])):
                new_grid[i].append(create_element(i, j, self[i][j]))

        return Matrix(new_grid)

    def __sub__(self, other):
        """
        Defines the behavior of - operator (as subtraction)
        """
        return self.copy(lambda i, j, element: element - other[i][j])

    def __mul__(self, other):
        """
        Defines the behavior of * operator (matrix multiplication)
        """
        tMatrixB = other.T()
        new_grid = []
        for i in range(self.h):
            new_grid.append([])
            for j in range(len(tMatrixB.g)):
                new_grid[i].append(dot_product(self[i], tMatrixB.g[j]))

        return Matrix(new_grid)

    def __rmul__(self, other):
        """
        Called when the thing on the left of the * is not a matrix.
        """
        if isinstance(other, numbers.Number):
            return self.copy(lambda i, j, element: other * element)
