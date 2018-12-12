from simulate import Simulation
import simulate as sim
import helpers
# reload(localizer)
# reload(sim)
# reload(helpers)

R = 'r'
G = 'g'

grid = [
    [R, G, G, G, R, R, R],
    [G, G, R, G, R, G, R],
    [G, R, G, G, G, G, R],
    [R, R, G, R, G, G, G],
]

blur = 0.001
p_hit = 100.0
simulation = sim.Simulation(grid, blur, p_hit)

# remember, the user said that the robot would sometimes drive around for a bit...
# It may take several calls to "simulation.run" to actually trigger the bug.
simulation.run(1)
simulation.show_beliefs()
