import Image from "next/image";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";
import Logo from "./images/Web3Auth.svg";
import { useState } from "react";

export default function SignIn() {
  const { authenticate, authError, isAuthenticating, Moralis } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "BIYXQq-n2UUlH1Fr7kyh6yejWLN-B_i0aBBs2CyE8dvsWHuqB-KVwwGPv_0JGSZAmkCwbzAqvz_6TCUqwNH4ef0",
      chainId: Moralis.Chains.ETH_ROPSTEN,
    });
  };

  return (
    <div className={styles.card}>
      <Image className={styles.img} src={Logo} width={80} height={80} />
      {isAuthenticating && <p className={styles.green}>Authenticating</p>}
      {authError && (
        <p className={styles.error}>{JSON.stringify(authError.message)}</p>
      )}
      <div className={styles.buttonCard}>
        <button className={styles.loginButton} onClick={handleCustomLogin}>
          Login with Web3Auth
        </button>
      </div>
    </div>
  );
}
