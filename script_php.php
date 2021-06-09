<?php

$json_data = array();

if( isset($_GET['param']) ) {

     $json_keywords = json_decode(file_get_contents("keywords.json"));

     foreach( $json_keywords as $key => $item ) {
        foreach( $item as $val ) {
            if(strtoupper ($val) == strtoupper ($_GET['param'])){
                $json_data[] = $json_keywords[$key];
            }
        }
     }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($json_data);

}