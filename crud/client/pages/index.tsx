import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'


const Home = () =>
{

  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount()
  {
    console.log('Requesting account...');

    // Check if Meta Mask Extension exists 
    if (window.ethereum)
    {
      console.log('detected');

      try
      {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error)
      {
        console.log('Error connecting...');
      }

    } else
    {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet()
  {
    if (typeof window.ethereum !== 'undefined')
    {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  

  return (
    <div className={styles.container}>

        <button

          onClick={requestAccount}

        >Connect</button>
        <h3>Wallet Address: {walletAddress}</h3>
    </div>
  );
}

export default Home
