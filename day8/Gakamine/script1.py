def is_visible(trees,x,y):
    try:
        tree=trees[y][x]
        left=max(trees[y][0:x])
        right=max(trees[y][x+1:len(trees[0])])
        top=max([tree[x] for tree in trees[0:y]])
        bottom=max([tree[x] for tree in trees[y+1:len(trees)]])
        directions=[left,right,top,bottom]
        if tree>top or tree>bottom or tree>left or tree>right:
            return True
        return False
    except:
        return True


file = open("input", "r")
trees=[]
for line in file:
    trees.append([*line.replace("\n", "")])
    trees[-1] = [int(i) for i in trees[-1]]

sum=0
for y in range(0,len(trees)):
    for x in range(0,len(trees[0])):
        if is_visible(trees,x,y):
            sum+=1
print(sum)