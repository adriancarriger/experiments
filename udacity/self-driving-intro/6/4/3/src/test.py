from path_planner import PathPlanner
from map_dictionaries import map_40_dict

planner = PathPlanner(map_40_dict, 5, 34)
path = planner.path
if path == [5, 16, 37, 12, 34]:
    print("great! Your code works for these inputs!")
else:
    print("something is off, your code produced the following:")
    print(path)
