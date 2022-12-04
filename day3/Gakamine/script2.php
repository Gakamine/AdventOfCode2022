<?php
    $file=fopen("input", "r");
    $total=0;
    $counter=0;
    $lines=array();

    while(!feof($file)) {
        if($counter<3) {
            array_push($lines,str_split(fgets($file)));
            $counter++;
        } else {
            $pre_common = array_unique(array_intersect($lines[0], $lines[1]));
            $common = implode(array_unique(array_intersect($pre_common, $lines[2])))[0];
            if(ctype_upper($common)) {
                $total+=ord($common)-38;
            } else {
                $total+=ord($common)-96;
            }
            $counter=0;
            $lines=array();
        }
    }
    echo $total;
?>