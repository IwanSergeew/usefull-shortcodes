use Cloudinary\Cloudinary;

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => 'do1nsnut9', 
        'api_key' => '144133166887235', 
        'api_secret' => 'SZvOBbcTTqbsmRbwfheqf0nC0xY'
    ],
    'url' => [
        'secure' => true
        ]
    ]);

$imageObj = $cloudinary->uploadApi()->upload($_FILES['file']['tmp_name'], ["public_id" => $new_filename, "folder" => $DossierI]);
$url = $imageObj['secure_url'];
