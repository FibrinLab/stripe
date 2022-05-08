import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl="https://cxuoivr3tcrj.usemoralis.com:2053/server" appId="SALr30wRlS9702I1CpGTtzatt5vdbc6x2yiFNbEU">
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
