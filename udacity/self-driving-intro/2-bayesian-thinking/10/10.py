def gaussian_probability(mean, stdev, x_low, x_high):
    firstHalf = 0.5 - norm(loc=mean, scale=stdev).cdf(x_low)
    secondHalf = norm(loc=mean, scale=stdev).cdf(x_high) - 0.5

    return firstHalf + secondHalf
