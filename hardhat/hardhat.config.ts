import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.27",
      },
    ],
  },
  networks: {
    localhost: {
      chainId: 31337,
      url: "http://127.0.0.1:8545/",
    },
    hardhat: {
      chainId: 31337,
      // forking: {
      //   url: "https://eth-mainnet.g.alchemy.com/v2/8J4q8X1jZQJ1q9V2Z1vX8z5Y1Q4Y9Y9Y",
      // },
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_ID}`,
      chainId: 11155111,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};

export default config;
