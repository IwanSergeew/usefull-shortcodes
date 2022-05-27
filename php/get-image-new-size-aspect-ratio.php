<?php
function getFixedAspectRatio($image, $max_height, $max_width) {
    list($width, $height, $type, $attr) = getimagesize($image);
    $new_height = $max_height;
    $new_width = intval(($width / $height) * $new_height);
    if($new_width > $max_width) {
        $new_width = $max_width;
        $new_height = intval(($height / $width) * $new_width);
    }
    return [ $new_width, $new_height ];
}
?>
