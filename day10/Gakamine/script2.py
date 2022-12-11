file = open("input", "r")
x=1
cursor=1
crt=""
def draw(x,crt,cursor):
    sprite_pos=[i for i in range(x,x+3)]
    if cursor in sprite_pos:
        crt+="X"
    else:
        crt+=" "
    if cursor>39:
        crt+="|\n"
        cursor=1
    else:
        cursor+=1
    return crt,cursor


for line in file:
    line=line.strip().split(" ")
    if line[0]=="noop":
        crt,cursor=draw(x,crt,cursor)
    elif line[0]=="addx":
        crt,cursor=draw(x,crt,cursor)
        crt,cursor=draw(x,crt,cursor)
        x+=int(line[1])
print(crt)
