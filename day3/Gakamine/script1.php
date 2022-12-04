<?php
    $file = fopen("input", "r");
    $total = 0;

    while(!feof($file)) {
        $line=fgets($file);
        $middle=(strlen($line)-1)/2;

        $splitstring1 = str_split(substr($line, 0, $middle));
        $splitstring2 = str_split(substr($line, $middle));

        $common = implode(array_unique(array_intersect($splitstring1, $splitstring2)));
        
        if($line!="") {
            if(ctype_upper($common)) {
                $total+=ord($common)-38;
            } else {
                $total+=ord($common)-96;
            }
        }
    }

    echo $total;
?>