file = open('input', 'r')
lines = file.readlines()

max_cal=[0,0,0]
elf_cal=0

for line in lines:
    if line in ['\n', '\r\n']:
        for cal in max_cal:
            if elf_cal > cal:
                max_cal[max_cal.index(cal)]=elf_cal
                max_cal.sort()
                break
        elf_cal=0
    else:
        elf_cal+=int(line)

sum=0
for cal in max_cal:
    sum+=cal
print(sum)
