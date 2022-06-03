use Cloudinary\Cloudinary;

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => '', 
        'api_key' => '', 
        'api_secret' => ''
    ],
    'url' => [
        'secure' => true
        ]
    ]);

$imageObj = $cloudinary->uploadApi()->upload($_FILES['file']['tmp_name'], ["public_id" => $new_filename, "folder" => $DossierI]);
$url = $imageObj['secure_url'];
