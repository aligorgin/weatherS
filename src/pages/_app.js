import '../../styles/globals.css';
import {ThemeProvider} from "styled-components";
import GlobalStyles from "../theme/globalStyles";
import Theme from "../theme/theme";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles/>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp
