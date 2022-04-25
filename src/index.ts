import dotenv from "dotenv";
import { APIMarket, SpotClient, WebsocketClient } from "bybit-api";
import getBalances from "./misc/getBalances";
import getSymbols from "./misc/getSymbols";
import { logSuccess, logStatus, logError, log } from "./misc/logging";
dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_KEY;
const isLiveNet = true;

// logStatus(API_KEY);
// logStatus(API_SECRET);

//Spot Account Client Setup
// const client = new SpotClient(API_KEY, API_SECRET, isLiveNet);
// const balances = getBalances(client);
// const symbols = getSymbols(client);

//Websocket Data Setup
const wsConfig = {
  key: API_KEY,
  secret: API_SECRET,
  livenet: true,
  linear: false,
  market: "spot" as APIMarket,
  pongTimeout: 0,
  pongInterval: 0,
  reconnectTimeout: 500,
};

const websocket = new WebsocketClient(wsConfig);

// Listen to events coming from websockets. This is the primary data source
websocket.on("update", (data) => {
  console.log("[Socket] Update:");
  console.log("[Symbol]:", data.data[0].s);
  console.log("[Time]:", data.data[0].t, "\n");

  console.log("[BID]:\t");
  for (let x = 0; x < 5; x++) {
    let tempBid = data.data[0].b[x];
    console.log(tempBid[0], tempBid[1]);
  }
  console.log("");

  console.log("[ASK]:\t");
  for (let x = 0; x < 5; x++) {
    let tempAsk = data.data[0].a[x];
    console.log(tempAsk[0], tempAsk[1]);
  }

  console.log("\n\n");
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
websocket.on("open", ({ wsKey, event }) => {
  console.log("[Socket] Connection open for websocket with ID: " + wsKey);
  // websocket.subscribe(['position', 'execution', 'trade']);
  // websocket.subscribe(["orderBookL2_25.ETHUSDT"]);
  websocket.subscribePublicSpotOrderbook("ETHUSDT", "full");
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
websocket.on("response", (response) => {
  console.log("[Response]", response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
websocket.on("close", () => {
  console.log("[Socket] Connection closed");
});

// On reconnected event
websocket.on("reconnected", () => {
  websocket.subscribePublicSpotOrderbook("ETHUSDT", "full");
});

// Optional: Listen to raw error events.
// Note: responses to invalid topics are currently only sent in the "response" event.
websocket.on("error", (err) => {
  console.error("[Error]", err);
});
