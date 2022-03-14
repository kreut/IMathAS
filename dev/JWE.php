<?php

use Jose\Component\Core\AlgorithmManager;
use Jose\Component\Encryption\Algorithm\KeyEncryption\PBES2HS512A256KW;
use Jose\Component\Encryption\Algorithm\ContentEncryption\A256GCM;
use Jose\Component\Encryption\Compression\CompressionMethodManager;
use Jose\Component\Encryption\Compression\Deflate;
use Jose\Component\Encryption\JWEDecrypter;
use Jose\Component\Encryption\Serializer\CompactSerializer;
use Jose\Component\KeyManagement\JWKFactory;

class JWE

{
    public $keyEncryptionAlgorithmManager;
    public $contentEncryptionAlgorithmManager;
    public $compressionMethodManager;
    public $jwk;
    public $serializer;

    public function __construct()
    {

        $this->keyEncryptionAlgorithmManager = new AlgorithmManager([new PBES2HS512A256KW(),]);
        $this->contentEncryptionAlgorithmManager = new AlgorithmManager([new A256GCM(),]);
        $this->compressionMethodManager = new CompressionMethodManager([new Deflate(),]);
        $this->serializer = new CompactSerializer(); // The serializer
    }

    public function decrypt(string $token, string $secret_file)
    {

        $jweDecrypter = new JWEDecrypter(
            $this->keyEncryptionAlgorithmManager,
            $this->contentEncryptionAlgorithmManager,
            $this->compressionMethodManager
        );
        $jwk = JWKFactory::createFromSecret(
            file_get_contents($_SERVER['DOCUMENT_ROOT'] . "/../JWE/$secret_file")
        );

        $jwe = $this->serializer->unserialize($token);
        $success = $jweDecrypter->decryptUsingKey($jwe, $jwk, 0);
        return $success ? $jwe->getPayload() : false;

    }

}
