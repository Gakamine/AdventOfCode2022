def update_pos(direction,tail,head,prev_pos):
    if direction=="U":
        head=[head[0],head[1]+1]
    elif direction=="D":
        head=[head[0],head[1]-1]
    elif direction=="L":
        head=[head[0]-1,head[1]]
    elif direction=="R":
        head=[head[0]+1,head[1]]
    
    diff=[head[0]-tail[0],head[1]-tail[1]]
    if abs(diff[0])>1 or abs(diff[1])>1:
        if abs(diff[0])>abs(diff[1]):
            tail=[tail[0]+int(diff[0]/abs(diff[0])),tail[1]]
            if diff[1] != 0 and [tail[0],tail[1]+int(diff[1]/abs(diff[1]))] != head:
                tail=[tail[0],tail[1]+int(diff[1]/abs(diff[1]))]
        elif abs(diff[0])<abs(diff[1]):
            tail=[tail[0],tail[1]+int(diff[1]/abs(diff[1]))]
            if diff[0] != 0 and [tail[0]+int(diff[0]/abs(diff[0])),tail[1]] != head:
                tail=[tail[0]+int(diff[0]/abs(diff[0])),tail[1]]

    if tail not in prev_pos:
        prev_pos.append(tail)
    return tail,head,prev_pos

file = open("input","r")
prev_pos=[[0,0]]
tail=[0,0]
head=[0,0]
for line in file:
    line=line.strip().split(" ")
    for i in range(0,int(line[1])):
        tail,head,prev_pos=update_pos(line[0],tail,head,prev_pos)

print(len(prev_pos))