#!/bin/bash
score=0

while read line; do

    elf=$(echo $line | cut -d" " -f1)
    you=$(echo $line | cut -d" " -f2)

    if [ $you == "X" ]; then
        if [ $elf == "A" ]; then
            you="Z"
        elif [ $elf == "B" ]; then
            you="X"
        else
            you="Y"
        fi
    elif [ $you == "Y" ]; then
        score=$((score+3))
        if [ $elf == "A" ]; then
            you="X"
        elif [ $elf == "B" ]; then
            you="Y"
        else
            you="Z"
        fi
    elif [ $you == "Z" ]; then
        score=$((score+6))
        if [ $elf == "A" ]; then
            you="Y"
        elif [ $elf == "B" ]; then
            you="Z"
        else
            you="X"
        fi
    fi

    if [ $you == "X" ]; then
        score=$((score+1))
    elif [ $you == "Y" ]; then
        score=$((score+2))
    elif [ $you == "Z" ]; then
        score=$((score+3))
    fi

done < input

echo $score