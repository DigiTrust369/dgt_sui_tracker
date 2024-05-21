// import { 
//   Ed25519Keypair, 
//   fromExportedKeypair,
//   toB64
// } from "@mysten/sui.js";
// import { DigiTrustVault } from "./digitrust";
// import { CetusPool } from "./dexs/cetus/cetus";
// // import { TurbosPool } from "./dexs/turbos/turbos";
// import { Arbitrage } from "./strategies/arbitrage";
// import { MarketDifference } from "./strategies/market_difference";
// import { RideTheTrend } from "./strategies/ride_the_trend";
// import { DigiTrustStrategy } from "./strategies/digitrust_strategy";
// import { Aftermath } from "aftermath-ts-sdk";

// import Redis from "ioredis";
// const redis = new Redis();
// (async () => {

//   const signal = {
//     symbol: '123456',
//     chain: 'SUI',
//     contract: '0x1314',
//     take_profit:12,
//     cut_loss: 6,
//     entry:'0.13',
//     base_price: 'USD',
//     note: 'Logrocket Blog',
//   };

//   const resp = await redis.set("sui_signal", JSON.stringify(signal))
//   console.log("Publish price signal status: ", resp)
// })();

// const afSdk = new Aftermath("TESTNET");
// const pools = afSdk.Pools()
// pools.getPool({
//   objectId: "0x57d3adc5f1afae3a5e09f646aa445a1a14dc953ba34201219068a5c04a8c501f",
// }).then((resp) =>{
//   console.log("Pool detail: ", resp)
// })

// // Convenience map from name to address for commonly used coins
// export const coins = {
//   SUI: "0x2::sui::SUI",
//   USDC: "0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN",
//   CETUS:
//     "0x06864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
//   CETUS0:
//     "0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS",
//   BRT: "0x5580c843b6290acb2dbc7d5bf8ab995d4d4b6ba107e2a283b4d481aab1564d68::brt::BRT",
//   WETH: "0xaf8cd5edc19c4512f4259f0bee101a40d41ebed738ade5874359610ef8eeced5::coin::COIN",
//   TOCE: "0xd2013e206f7983f06132d5b61f7c577638ff63171221f4f600a98863febdfb47::toce::TOCE",
//   USDT: "0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN",
//   WBTC: "0x027792d9fed7f9844eb4839566001bb6f6cb4804f66aa2da6fe1ee242d896881::coin::COIN",
// };

// // Setup default amount to trade for each token in each pool. Set to approximately 1 USD each.
// export const defaultAmount: Record<string, number> = {};
// defaultAmount[coins.SUI] = 1_000_000_000;
// defaultAmount[coins.USDC] = 1_000_000;
// defaultAmount[coins.CETUS] = 15_000_000_000;
// defaultAmount[coins.CETUS0] = 15_000_000_000;
// defaultAmount[coins.BRT] = 150_000_000_000_000;
// defaultAmount[coins.WETH] = 100_000;
// defaultAmount[coins.TOCE] = 100_000_000_000;
// defaultAmount[coins.USDT] = 1_000_000;
// defaultAmount[coins.WBTC] = 3_000;

// // A conservative upper limit on the max gas price per transaction block in SUI
// export const MAX_GAS_PRICE_PER_TRANSACTION = 4_400_000;

// const RIDE_THE_TREND_LIMIT = 1.000005;
// const ARBITRAGE_RELATIVE_LIMIT = 1.0001;
// const MARKET_DIFFERENCE_LIMIT = 1.01;

// // Setup wallet from passphrase.
// const phrase = process.env.ADMIN_PHRASE || 'inside broccoli disagree quick sadness brand segment expand chaos fury fancy bird undo south lamp dune meadow train promote pledge favorite sponsor polar guitar';
// export const keypair = Ed25519Keypair.deriveKeypair(phrase!);

// // const privkey = '0x5d1337db6186b4d577c9098fdef1aac46f8e85870631ee87a71739cd8ed0c6ba'
// // const privateKeyBytes = Uint8Array.from(Buffer.from(privkey.slice(2), "hex")); 

// // export const keypair = fromExportedKeypair({
// //     schema: "ED25519",
// //     privateKey: toB64(privateKeyBytes),
// // });

// let digiTrustVault = new DigiTrustVault(keypair);
// const cetusUSDCtoSUI = new CetusPool(
//   "0xcf994611fd4c48e277ce3ffd4d4364c914af2c3cbb05f7bf6facd371de688630",
//   coins.USDC,
//   coins.SUI
// );
// // const cetusCETUStoSUI = new CetusPool(
// //   "0x2e041f3fd93646dcc877f783c1f2b7fa62d30271bdef1f21ef002cebf857bded",
// //   coins.CETUS,
// //   coins.SUI
// // );
// // const cetusUSDCtoCETUS = new CetusPool(
// //   "0x238f7e4648e62751de29c982cbf639b4225547c31db7bd866982d7d56fc2c7a8",
// //   coins.USDC,
// //   coins.CETUS
// // );
// // const turbosSUItoUSDC = new TurbosPool(
// //   "0x5eb2dfcdd1b15d2021328258f6d5ec081e9a0cdcfa9e13a0eaeb9b5f7505ca78",
// //   coins.SUI,
// //   coins.USDC,
// //   "0x91bfbc386a41afcfd9b2533058d7e915a1d3829089cc268ff4333d54d6339ca1::fee3000bps::FEE3000BPS"
// // );
// const cetusWBTCtoUSDC = new CetusPool(
//   "0xaa57c66ba6ee8f2219376659f727f2b13d49ead66435aa99f57bb008a64a8042",
//   coins.WBTC,
//   coins.USDC
// );

// digiTrustVault.addPool(cetusUSDCtoSUI);
// // digiTrustVault.addPool(cetusCETUStoSUI);
// // digiTrustVault.addPool(cetusUSDCtoCETUS);
// // DigiTrustVault.addPool(turbosSUItoUSDC);
// digiTrustVault.addPool(cetusWBTCtoUSDC);

// // Trend riding strategies
// // digiTrustVault.addStrategy(
// //   new RideTheTrend(
// //     cetusUSDCtoSUI.uri,
// //     5,
// //     10,
// //     [
// //       defaultAmount[cetusUSDCtoSUI.coinTypeA],
// //       defaultAmount[cetusUSDCtoSUI.coinTypeB],
// //     ],
// //     RIDE_THE_TREND_LIMIT,
// //     "RideTheTrend (USDC/SUI)"
// //   ) 
// // );
// // digiTrustVault.addStrategy(
// //   new RideTheTrend(
// //     cetusCETUStoSUI.uri,
// //     5,
// //     10,
// //     [
// //       defaultAmount[cetusCETUStoSUI.coinTypeA],
// //       defaultAmount[cetusCETUStoSUI.coinTypeB],
// //     ],
// //     RIDE_THE_TREND_LIMIT,
// //     "RideTheTrend (CETUS/SUI)"
// //   )
// // );
// // digiTrustVault.addStrategy(
// //   new RideTheTrend(
// //     cetusUSDCtoCETUS.uri,
// //     5,
// //     10,
// //     [
// //       defaultAmount[cetusUSDCtoCETUS.coinTypeA],
// //       defaultAmount[cetusUSDCtoCETUS.coinTypeB],
// //     ],
// //     RIDE_THE_TREND_LIMIT,
// //     "RideTheTrend (USDC/CETUS)"
// //   )
// // );

// // Add triangular arbitrage strategy: USDC/SUI -> (CETUS/SUI)^-1 -> (USDC/CETUS)^-1.
// // digiTrustVault.addStrategy(
// //   new Arbitrage(
// //     [
// //       // {
// //       //   pool: turbosSUItoUSDC.uri,
// //       //   a2b: true,
// //       // },
// //       {
// //         pool: cetusUSDCtoCETUS.uri,
// //         a2b: true,
// //       },
// //       {
// //         pool: cetusCETUStoSUI.uri,
// //         a2b: true,
// //       },
// //     ],
// //     defaultAmount[coins.SUI],
// //     ARBITRAGE_RELATIVE_LIMIT,
// //     "Arbitrage: SUI -Turbos-> USDC -Cetus-> CETUS -Cetus-> SUI"
// //   )
// // );

// // digiTrustVault.addStrategy(
// //   new Arbitrage(
// //     [
// //       // {
// //       //   pool: turbosSUItoUSDC.uri,
// //       //   a2b: true,
// //       // },
// //       {
// //         pool: cetusUSDCtoSUI.uri,
// //         a2b: true,
// //       },
// //     ],
// //     defaultAmount[coins.SUI],
// //     ARBITRAGE_RELATIVE_LIMIT,
// //     "Arbitrage: SUI -Turbos-> USDC -Cetus-> SUI"
// //   )
// // );


// // Start the bot
// // digiTrustVault.loop(24, 1000);

import { TestnetSDK } from "./dexs/cetus/testnet_config";

async function retrievelAllPools() {
  // If you want to get all pools, just pass one empty array.
  const pools = await TestnetSDK.Pool.getPoolsWithPage([])
  console.log(`pool length: ${pools.length}`)
}
// retrievelAllPools()
//pool length: 82

async function batchRetrievalPools() {
  const betch_pool_addresses = [
    '0xbed3136f15b0ea649fb94bcdf9d3728fb82ba1c3e189bf6062d78ff547850054',
    '0x74dcb8625ddd023e2ef7faf1ae299e3bc4cb4c337d991a5326751034676acdae',
  ]

  // if pool addresses not empty, you will get the pool list of the addresses.
  const betch_pools = await TestnetSDK.Pool.getPoolsWithPage(betch_pool_addresses)
  console.log({ betch_pools })
}
//batchRetrievalPools()

async function fetchOnePool() {
  const pool = await TestnetSDK.Pool.getPool('0xbed3136f15b0ea649fb94bcdf9d3728fb82ba1c3e189bf6062d78ff547850054')
  console.log({ pool })
}
fetchOnePool()