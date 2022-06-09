<?php
    require 'vendor/autoload.php'; // composer require google/cloud-translate

    use Google\Cloud\Translate\V2\TranslateClient;

    $config = ['keyFilePath' => 'key.json']; // Generate the json key file from https://console.cloud.google.com/iam-admin/serviceaccounts
    $text = "The text to translate.";
    $targetLanguage = "bg";

    $TranslateClient = new TranslateClient($config);
    $result = $TranslateClient->translate($text, [
        "target" => $targetLanguage,
    ]);
    var_dump($result); // array(4) { ["source"]=> string(2) "en" ["input"]=> string(22) "The text to translate." ["text"]=> string(33) "Текстът за превод." ["model"]=> NULL }
    exit;
?>
