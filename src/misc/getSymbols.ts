import Bybit from "bybit-api";

const getSymbol = (client: Bybit.SpotClient) => {
  client
    .getSymbols()
    .then((result) => {
      console.log(result.result);
    })
    .catch((err) => {
      return err;
    });
};

export default getSymbol;
