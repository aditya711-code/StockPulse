const API_KEY='2G8UIRDEFJG0ZND9'
const API_URLS={
    getTopGainersAndLosers:()=>`https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${API_KEY}`,
    getCompanyOverview:(symbol)=>`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`,
    getSearch:(keywords)=>`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`
}
export {API_KEY,API_URLS}
