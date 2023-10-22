import fs from "fs";
import * as snarkjs from "snarkjs";
import { ethers } from "ethers";

export async function generateProof(
  addr: string,
  secret: number
): Promise<{
  proof: snarkjs.Groth16Proof;
  publicSignals: snarkjs.PublicSignals;
}> {
  const { proof, publicSignals } = await prove(BigInt(addr), BigInt(secret));

  return { proof, publicSignals };
}

async function prove(
  addrBN: BigInt,
  secretBN: BigInt
): Promise<{
  proof: snarkjs.Groth16Proof;
  publicSignals: snarkjs.PublicSignals;
}> {
  const circuitWasmPath = "../circuits/artemis_js/artemis.wasm";
  const zkeyPath = "../circuits/artemis_js/artemis_0001.zkey";
  return await snarkjs.groth16.fullProve(
    { addr: addrBN.toString(), secret: secretBN.toString() },
    circuitWasmPath,
    zkeyPath
  );
}
