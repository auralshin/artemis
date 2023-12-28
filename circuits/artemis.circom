pragma circom 2.0.0;

include "./mimc.circom";

template DoubleHash() {
    signal input addr;
    signal input secret;
    signal intermed;
    signal output out;

    component hash1 = MiMC7(3);
    component hash2 = MiMC7(3);

    hash1.x_in <== (addr + secret);
    hash1.k <== 123456789;
    intermed <== hash1.out;

    // Second hash using the first hash result as input
    hash2.x_in <== intermed;
    hash2.k <== 987654321; 
    out <== hash2.out;
}

component main {public [addr]} = DoubleHash();
