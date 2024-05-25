import { trade } from "./dexs/cetus/trade";

async function main() {
	console.log(`[${new Date().toLocaleString()}] App Started`);
	
	await trade(
		"0x8581097ba4ffe7e8cfed6146bd536cde5d08d0f94021fded8b62803922c824bf",
		false,
		true,
		1000000,
		5
	);
}

main().catch(console.error);