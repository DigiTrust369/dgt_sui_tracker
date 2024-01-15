import {
    JsonRpcProvider,
    SUI_CLOCK_OBJECT_ID,
    TransactionArgument,
    TransactionBlock,
    mainnetConnection,
    testnetConnection,
    toB64,
    RawSigner,
    fromExportedKeypair
} from "@mysten/sui.js";

import { keypair } from "../../index";
import {
buildInputCoinForAmount,
getTotalBalanceByCoinType,
} from "../../utils/utils";
import { mainnet } from "../cetus/mainnet_config";
import { testnet } from "../cetus/testnet_config";
import { suiswapConfig } from "../dexsConfig";
import { DigiTrustParams } from "../dexsParams";
import { Pool, PreswapResult } from "../pool";

enum sdkEnv {
mainnet = "mainnet",
testnet = "testnet",
}

// Use testnet or mainnet.
const currSdkEnv: sdkEnv = sdkEnv.mainnet;

function buildSdkOptions() {
  switch (currSdkEnv) {
    case sdkEnv.mainnet:
      return mainnet;
    case sdkEnv.testnet:
      return testnet;
  }
}

export class DigiTrustPool extends Pool<DigiTrustParams>{
    private package: string;
    private module: string;
    private senderAddress: string;

    constructor(address: string, coinTypeA: string, coinTypeB: string){
        super(address, coinTypeA, coinTypeB);
        this.senderAddress = keypair.getPublicKey().toSuiAddress();

        this.package = ''
        this.module = ''
    }

    async createSwapTransaction(
        transactionBlock: TransactionBlock,
        params: DigiTrustParams
    ): Promise<TransactionBlock>{
        console.log(`Swap: ${params.amountIn}`)
        let provider = new JsonRpcProvider(testnetConnection)

        const privkey = '0x5d1337db6186b4d577c9098fdef1aac46f8e85870631ee87a71739cd8ed0c6ba'
        const privateKeyBytes = Uint8Array.from(Buffer.from(privkey.slice(2), "hex")); 

        const keypair = fromExportedKeypair({
            schema: "ED25519",
            privateKey: toB64(privateKeyBytes),
        });

        const coins: TransactionArgument[] | undefined =
        await buildInputCoinForAmount(
            transactionBlock,
            BigInt(params.amountIn),
            params.a2b ? this.coinTypeA : this.coinTypeB,
            this.senderAddress!,
            provider
        );

        if (typeof coins !== "undefined") {
            transactionBlock.moveCall({
              target: `${this.package}::${this.module}::PQD`,
              arguments: [
                transactionBlock.object(this.uri),
                transactionBlock.makeMoveVec({
                  objects: coins,
                }),
                transactionBlock.pure(params.amountIn.toFixed(0), "u64"),
                transactionBlock.pure(0, "u64"),
                transactionBlock.object(SUI_CLOCK_OBJECT_ID),
              ],
              typeArguments: [this.coinTypeA, this.coinTypeB],
            });
      
            return transactionBlock;
          }
      
          return transactionBlock;
    }

    async estimatePriceAndFee(): Promise<{
        price: number;
        fee: number;
    }> {
    // FIXME: estimate price
    return {
        price: 0 ** 2 / 2 ** 128,
        fee: 0,
    };
    }
}