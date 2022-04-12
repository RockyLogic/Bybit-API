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
  linear: true,
  market: "spot" as APIMarket,
  pongTimeout: 1000,
  pongInterval: 1000,
  reconnectTimeout: 500,
};

const websocket = new WebsocketClient(wsConfig);

// websocket.subscribe(['position', 'execution', 'trade']);
websocket.subscribe("trade.ETHUSDT");

// Listen to events coming from websockets. This is the primary data source
websocket.on("update", (data) => {
  console.log("update", data);
});

// Optional: Listen to websocket connection open event (automatic after subscribing to one or more topics)
websocket.on("open", ({ wsKey, event }) => {
  console.log("connection open for websocket with ID: " + wsKey);
});

// Optional: Listen to responses to websocket queries (e.g. the response after subscribing to a topic)
websocket.on("response", (response) => {
  console.log("response", response);
});

// Optional: Listen to connection close event. Unexpected connection closes are automatically reconnected.
websocket.on("close", () => {
  console.log("connection closed");
});

// Optional: Listen to raw error events.
// Note: responses to invalid topics are currently only sent in the "response" event.
websocket.on("error", (err) => {
  console.error("ERR", err);
});
