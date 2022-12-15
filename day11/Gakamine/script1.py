monkeys=[]
with open("input") as f:
    lines = f.read()
    for i in range(0,int((lines.count("\n")+1)/7)):
        monkey = lines.split('\n')[i*7:i*7+7]
        items=[int(e) if e.isdigit() else e for e in monkey[1].split(": ")[1].split(', ')]
        operation=monkey[2].split("= ")[1].replace("old","item")
        test=int(monkey[3].split("by ")[1])
        if_true=int(monkey[4].split("monkey ")[1])
        if_false=int(monkey[5].split("monkey ")[1])
        monkeys.append([items,operation,test,if_true,if_false,0])

for i in range(0,20):
    for monkey in monkeys:
        for item in monkey[0]:
            monkey[5]+=1
            item=int(int(eval(monkey[1]))/3)
            if item%monkey[2]==0:
                monkeys[monkey[3]][0].append(item)
            else:
                monkeys[monkey[4]][0].append(item)
        monkey[0]=[]

sorted_list=[i[-1] for i in monkeys]
sorted_list.sort(reverse=True)
print(sorted_list[0]*sorted_list[1])