<?php
declare(strict_types=1);
use Firebase\JWT\JWT;
require_once('../vendor/autoload.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");

if($hasValidCredentials){
    $secretKey = 'cdSii:rpckTM[y*G#X]k]3XH78NmSt.G';
    $issueTime = new DateTimeImmutable();
    $expireTime = $issueTime->modify('+6minutes')->getTimeStamp();
    $serverName = 'http://localhost:80/scripts';
    $username = 'username';

    $requestData = [
        'iat' => $issueTime->getTimeStamp(),
        'iss' => $serverName,
        'nbf' => $issueTime->getTimeStamp(),
        'exp' => $expireTime,
        'userName' => $username,
    ];

    echo JWT::encode(
        $requestData,
        $secretKey,
        'HS512'
    );
}