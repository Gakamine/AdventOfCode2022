file = open("input", "r")
x=1
cycle=1
signal=0

def clock_tick(current_cycle,signal,x):
    cycles=[20,60,100,140,180,220]
    if current_cycle in cycles:
        signal+=(x*cycle)
    return (current_cycle+1,signal)

for line in file:
    line=line.strip().split(" ")
    if line[0]=="noop":
        cycle,signal=clock_tick(cycle,signal,x)
    elif line[0]=="addx":
        cycle,signal=clock_tick(cycle,signal,x)
        cycle,signal=clock_tick(cycle,signal,x)
        x+=int(line[1])

print(signal)
