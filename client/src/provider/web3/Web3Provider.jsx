import { createContext, useContext, useEffect, useState } from "react";
import detectEthereumProvider from '@metamask/detect-provider'
import loadContract from './../../util/loadContracts'
import Web3 from "web3";

const Web3Context = createContext(null)

const Web3Provider = ({ children }) => {
    
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
        isLoading: true
    })

    useEffect(() => {
        const loadProvider = async () => {
            const provider = await detectEthereumProvider();

            console.log("----------");
            console.log(provider);
            console.log("----------");


            if (provider) {
                const web3 = new Web3(provider);
                
                console.log("----------");
                console.log(web3);
                console.log("----------");
    
                //===========================================================//
                const walletContract = await loadContract("Wallet", provider);
                const musicContract = await loadContract("MusicNft", provider);
                const marketContract = await loadContract("MusicMarket", provider);
                //===========================================================//
                
                setWeb3Api({
                    provider: provider,
                    web3: web3,
                    contract: {
                        walletContract,
                        musicContract,
                        marketContract
                    },
                    isLoading: false
                });
                
            } else {
                setWeb3Api({
                    ...web3Api,
                    isLoading: false
                });
            }
        }
        loadProvider();
    }, []);

    return (
        <Web3Context.Provider value={{web3Api,setWeb3Api}}>
            {children}
        </Web3Context.Provider>
    );
}

export function useWeb3() { 
    return useContext(Web3Context);
}

export default Web3Provider;