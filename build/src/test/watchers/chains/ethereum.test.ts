import "mocha";
import { expect } from "chai";

import { parseEthereumState } from "../../../src/watchers/chains/drivers/ethereum";
import { ChainDataResult } from "../../../src/watchers/chains/types";
import { parseEthersSyncing } from "../../../src/watchers/chains/utils";

describe("Watchers > chains > ethereum", () => {
  describe("parseEthereumState", () => {
    it("Should parse an OpenEthereum state when syncing from snapshot", () => {
      // const name = "OpenEthereum";
      // const api = "http://my.openethereum.dnp.dappnode.eth:8545";
      const syncing = {
        currentBlock: "0x0",
        highestBlock: "0x958116",
        startingBlock: "0x0",
        warpChunksAmount: "0x11a3",
        warpChunksProcessed: "0x111f"
      };
      const blockNumber = 0;

      const expecteChainData: ChainDataResult = {
        syncing: true,
        error: false,
        message: "Syncing snapshot: 4383 / 4515",
        progress: 0.9707641196013289
      };

      const chainData = parseEthereumState(
        parseEthersSyncing(syncing),
        blockNumber
      );

      expect(chainData).to.deep.equal(expecteChainData);
    });

    it("Should parse an OpenEthereum state when syncing from blocks", () => {
      const syncing = {
        currentBlock: "0x947887",
        highestBlock: "0x958362",
        startingBlock: "0x947885",
        warpChunksAmount: null,
        warpChunksProcessed: null
      };

      const blockNumber = 0;

      const expecteChainData: ChainDataResult = {
        syncing: true,
        error: false,
        message: "Blocks synced: 9730183 / 9798498",
        progress: 0.9930280130689418
      };

      const chainData = parseEthereumState(
        parseEthersSyncing(syncing),
        blockNumber
      );

      expect(chainData).to.deep.equal(expecteChainData);
    });
  });
});
