def visibility(trees,x,y):
    tree=trees[y][x]
    left=trees[y][0:x][::-1]
    right=trees[y][x+1:len(trees[0])]
    top=[tree[x] for tree in trees[0:y]][::-1]
    bottom=[tree[x] for tree in trees[y+1:len(trees)]]
    visibility=1
    directions=[left,right,top,bottom]
    for direction in directions:
        if direction == []:
            return 0
        for tmp_tree in range(0,len(direction)):
            if direction[tmp_tree]>=tree or tmp_tree==len(direction)-1:
                visibility=visibility*(tmp_tree+1)
                break
    return visibility


file = open("input", "r")
trees=[]
for line in file:
    trees.append([*line.replace("\n", "")])
    trees[-1] = [int(i) for i in trees[-1]]

scenic_score=0
for y in range(0,len(trees)):
    for x in range(0,len(trees[0])):
        tmp_scenic_score=visibility(trees,x,y)
        if tmp_scenic_score>scenic_score:
            scenic_score=tmp_scenic_score
print(scenic_score)