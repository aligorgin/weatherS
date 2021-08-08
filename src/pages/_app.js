import {ThemeProvider} from "styled-components";
import GlobalStyles from "../../styles/theme/GlobalStyles";
import Theme from "../../styles/theme/theme";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles/>
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default MyApp;
