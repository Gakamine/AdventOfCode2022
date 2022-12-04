#!/bin/bash
score=0

while read line; do

    elf=$(echo $line | cut -d" " -f1)
    you=$(echo $line | cut -d" " -f2)

    if [ $you == "X" ]; then
        score=$((score+1))
    elif [ $you == "Y" ]; then
        score=$((score+2))
    elif [ $you == "Z" ]; then
        score=$((score+3))
    fi

    if ([ $elf ==  "A" ] && [ $you == "X" ]) || ([ $elf == "B" ] && [ $you == "Y" ]) || ([ $elf == "C" ] && [ $you == "Z" ]); then
        score=$((score+3))
    else
        if [ $elf == "A" ] && [ $you == "Y" ];then
            score=$((score+6))
        fi
        if [ $elf == "B" ] && [ $you == "Z" ];then
            score=$((score+6))
        fi
        if [ $elf == "C" ] && [ $you == "X" ];then
            score=$((score+6))
        fi
    fi

done < input

echo $score