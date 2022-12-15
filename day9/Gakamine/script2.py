from itertools import repeat

def update_pos(direction,knots,prev_pos):
    if direction=="U":
        knots[0]=[knots[0][0],knots[0][1]+1]
    elif direction=="D":
        knots[0]=[knots[0][0],knots[0][1]-1]
    elif direction=="L":
        knots[0]=[knots[0][0]-1,knots[0][1]]
    elif direction=="R":
        knots[0]=[knots[0][0]+1,knots[0][1]]
    
    for knot in range(1,len(knots)):
        diff=[knots[knot-1][0]-knots[knot][0],knots[knot-1][1]-knots[knot][1]]
        if abs(diff[0])>1 or abs(diff[1])>1:
            if abs(diff[0])>abs(diff[1]):
                knots[knot]=[knots[knot][0]+int(diff[0]/abs(diff[0])),knots[knot][1]]
                if diff[1] != 0 and [knots[knot][0],knots[knot][1]+int(diff[1]/abs(diff[1]))]:
                    knots[knot]=[knots[knot][0],knots[knot][1]+int(diff[1]/abs(diff[1]))]
            elif abs(diff[0])<abs(diff[1]):
                knots[knot]=[knots[knot][0],knots[knot][1]+int(diff[1]/abs(diff[1]))]
                if diff[0] != 0 and [knots[knot][0]+int(diff[0]/abs(diff[0])),knots[knot][1]]:
                    knots[knot]=[knots[knot][0]+int(diff[0]/abs(diff[0])),knots[knot][1]]

    if knots[-1] not in prev_pos:
        prev_pos.append(knots[-1])
    return knots,prev_pos

file = open("../example2","r")
prev_pos=[[0,0]]
knots=list(repeat([0,0], 10))
for line in file:
    line=line.strip().split(" ")
    for i in range(0,int(line[1])):
        knots,prev_pos=update_pos(line[0],knots,prev_pos)

print(len(prev_pos))