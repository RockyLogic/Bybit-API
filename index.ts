import dotenv from "dotenv";
import Bybit from "bybit-api";

dotenv.config();

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_KEY;
const isLiveNet = true;

//Spot Account Client Setup
const client = new Bybit.SpotClient(API_KEY, API_SECRET, isLiveNet);

//Websocket Data Setup
const wsConfig = {
  key: API_KEY,
  secret: API_SECRET,
};

const websocket = new Bybit.WebsocketClient(wsConfig);
