import matplotlib.pyplot as plt
import numpy as np


def gaussian_density(inputs, mu, sigma):
    return list(map(lambda input: particular_density(input, mu, sigma), inputs))


def particular_density(input, mu, sigma):
    base = 1 / np.sqrt(2 * np.pi * np.square(sigma))
    eulers_exponent = -np.square(input - mu) / (2 * np.square(sigma))

    return base * np.exp(eulers_exponent)


def plot_gaussian(x, mu, sigma):
    y = gaussian_density(x, mu, sigma)
    plt.plot(x, y)
    plt.title('Gaussian Probability Density Function')
    plt.xlabel('x variable')
    plt.ylabel('probability density function')
    plt.show()


inputs = np.linspace(0, 100, 11)
print(plot_gaussian(inputs, 50, 10))
