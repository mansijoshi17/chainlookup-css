import logo from "./logo.svg";
import "./App.css";
import { ethers, Contract } from "ethers";
import { Web3 } from "web3";
import { nftContract, marketContract } from "./config";
import nftabi from "./abi/nftContract.json";
import marketabi from "./abi/market.json";
import { useState } from "react";
import Analytics from "./components/Analytics";
import { PriceChart } from "./components/PriceChart";

function App() {
  const [transfers, setTransfers] = useState([]);
  const [prices, setPrices] = useState([]);

  const detection = async () => {
    const tokenId = 1;
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://polygon-mumbai.g.alchemy.com/v2/l54btykd3Wi3BeZUTa6yEBO5Qs3iBbSi"
      )
    );

    const contract = new web3.eth.Contract(nftabi, nftContract);
    const latestBlock = await web3.eth.getBlockNumber();
    const target = Number(latestBlock) - 40000;

    try {
      // Fetch Transfer events for the given token ID
      const events = await contract.getPastEvents("Transfer", {
        filter: { tokenId: tokenId },
        fromBlock: target,
        toBlock: "latest",
      });

      console.log(`Total transfers  ${tokenId}: ${events.length} transfers`);
      let trans = [];
      // Iterate through the events and log details
      for (let event of events) {
        
        trans.push(event.returnValues);
      }
      setTransfers(trans);

      const marketcontract = new web3.eth.Contract(marketabi, marketContract);

      // Fetch Transfer events for the given token ID
      const events1 = await marketcontract.getPastEvents("MarketItemCreated", {
        filter: { tokenId: tokenId },
        fromBlock: target,
        toBlock: "latest",
      });
      let price = [];
      // Iterate through the events and log details
      for (let event of events1) {
        price.push(
          web3.utils.fromWei(Number(event.returnValues.price), "ether")
        );
      }
      setPrices(price);
    } catch (error) {
      console.error(`Error fetching transfers for token ${tokenId}:`, error);
    }
  };

  console.log(transfers);
  console.log(prices);

  return (
    <div className="App">
      <h1>Wash Trading Detection</h1>
      <form class="search-container">
        <input type="text" id="search-bar" placeholder="Search by Address" />
        <a href="#" onClick={detection}>
          <img
            class="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
          />
        </a>
      </form>
      <Analytics transfers={transfers} />
      <PriceChart prices={prices} />
    </div>
  );
}

export default App;
