package main

import (
	"fmt"
	"io/ioutil"
    "log"
	"strings"
)

func has_duplicates(array []string) bool {
	has_duplicates := false
	out_fc:
	for i := 0; i < len(array)-1; i++ {
		for j := i+1; j <= len(array)-1;j++ {
			if(array[i]==array[j]) {
				has_duplicates=true
				break out_fc
			}
		}
	}
	return !has_duplicates
}

func main() {
    content, err := ioutil.ReadFile("input")
	letters := strings.Split(string(content), "")
	first := 0
	len := 14 // YOU JUST NEED TO EDIT THIS LINE :D

     if err != nil {
          log.Fatal(err)
     }

	 out_main:
	 for {
		tmp := letters[first:first+len]
		if has_duplicates(tmp) {
			break out_main
		}
		first++
	 }
	 

    fmt.Println(first+len)
}