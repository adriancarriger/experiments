def transpose(matrix):
    matrix_transpose = []
    for i in range(len(matrix[0])):
        matrix_transpose.append([])
        for j in range(len(matrix)):
            matrix_transpose[i].append(matrix[j][i])

    return matrix_transpose


def dot_product(vector_one, vector_two):
    result = 0
    for i in range(len(vector_one)):
        result += vector_one[i] * vector_two[i]
    return result


def matrix_multiplication(matrixA, matrixB):
    tMatrixB = transpose(matrixB)
    result = []
    for i in range(len(matrixA)):
        result.append([])
        for j in range(len(tMatrixB)):
            result[i].append(dot_product(matrixA[i], tMatrixB[j]))

    return result


myTest = matrix_multiplication([[2, 1, 8, 2, 1], [5, 6, 4, 2, 1]], [
                               [1, 7, 2], [2, 6, 3], [3, 1, 1], [1, 20, 1], [7, 4, 16]])
print(myTest)
