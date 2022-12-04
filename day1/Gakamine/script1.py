file = open('input', 'r')
lines = file.readlines()

max_cal=0
elf_cal=0

for line in lines:
    if line in ['\n', '\r\n']:
        if elf_cal > max_cal:
            max_cal=elf_cal
        elf_cal=0
    else:
        elf_cal+=int(line)

print(max_cal)
