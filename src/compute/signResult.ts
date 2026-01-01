import { ethers } from "ethers";

export function signInference(
  wallet: ethers.Wallet,
  jobId: string,
  outputHash: string,
  timestamp: number,
  gateway: string
) {
  const digest = ethers.solidityPackedKeccak256(
    ["bytes32", "bytes32", "uint256", "address"],
    [jobId, outputHash, timestamp, gateway]
  );

  return wallet.signMessage(ethers.getBytes(digest));
}

