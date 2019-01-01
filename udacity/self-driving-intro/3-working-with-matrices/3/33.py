def identity_matrix(n):

    identity = []
    for i in range(n):
        identity.append([])
        for j in range(n):
            identity[i].append(1 if i == j else 0)

    return identity
