import Bybit from "bybit-api";

const getBalances = (client: Bybit.SpotClient) => {
  client
    .getBalances()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      return err;
    });
};

export default getBalances;
