import React, { useState ,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useWeb3 } from '../../provider/web3/Web3Provider';
import { User } from '../../provider/user/UserProvider';
import chain from '../../util/chainMap';

const useStyles = makeStyles({
  list: {
    width: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "20px"
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const { web3Api } = useWeb3();
  const { user, setUser } = User();
  const [metamaskBtn, setMetamaskBtn] = useState("Connect Metamask");
  const [add, setAdd] = useState(0);
  const [withdraw, setWithdraw] = useState(0);

  console.log("---------");
  console.log(web3Api);
  console.log("---------");

  const btn = useRef(null);


  const updateBalance = async () => {
    let bal;
    console.log(user.address);
    try {
        bal = Number(await web3Api.contract.walletContract.getBalance({from: user.address}));
    }
    catch (err) {
        console.log(err);
    };
    setUser({...user,balance: bal});
}

const addMoney = async () => {
    await web3Api.contract.walletContract.add({ from: user.address, value: add*1000000000000000000 });
    updateBalance();
    setAdd(0);
}

const withdrawMoney = async () => {
    await web3Api.contract.walletContract.withdraw(withdraw.toString(),{from: user.address});
    updateBalance();
    setWithdraw(0);
}

const handleConnection = async () => {
    
    const networkId = window.ethereum.networkVersion;
    
    if (metamaskBtn === "Get Metamask Today") {
        window.open("https://metamask.io/download/", "_blank");
        window.location.reload();
    }

    try {
        const acc = await web3Api.provider.request({ method: 'eth_requestAccounts' })
        console.log(acc[0]);
        setMetamaskBtn("Metamask Connected");

        let bal;
        try {
            bal = Number(await web3Api.contract.walletContract.getBalance({from: user.address}));
        }
        catch (err) {
            console.log(err);
        };
        setUser(
            {
                ...user,
                balance: bal,
                address: acc[0],
                networkId,
                network: chain.get(Number(networkId))
            }
        );
    }
  
    catch (err) {
        console.log(err);
        if (err.code === -32002) {
            setMetamaskBtn("Connect To Metamask")
            window.location.reload();
        } else {
            setMetamaskBtn("Get Metamask Today");
        }
    }
}

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <>
      <div
        className={classes.list}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <h1 class="is-4 is-flex is-justify-content-center">
          <AccountCircleIcon />
          &nbsp; My Wallet
        </h1>
        <Button variant="contained" color='dark' ref={btn} onClick={() => { handleConnection() }}>
          <img src="https://img.icons8.com/color/48/000000/metamask-logo.png" width="30px" alt='' />
          {metamaskBtn}
        </Button>
      </div>
      <Divider />
      <p className='subtitle is-6 has-text-centered m-1 has-text-danger'>{user.address}</p>

      {user.address ? (
        <div className="card-content" >
          <p class="title is-3 m-3 has-text-primary">{user.balance} ETH</p>
          <div className='columns is-multiline'>
            <div className='column'>
              <div className="field">
                <div className="control">
                  <input className="input" type="number" placeholder="Enter Amount" value={add} onChange={(e) => { setAdd(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className='column'>
              <button className="button is-danger p-3" onClick={() => { addMoney() }}>Add</button>
            </div>
          </div>

          <div className='columns'>
            <div className='column'>
              <div className="field">
                <div className="control">
                  <input className="input" type="number" placeholder="Enter Amount" value={withdraw} onChange={(e) => { setWithdraw(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className='column'>
              <button className="button is-primary p-3" onClick={() => { withdrawMoney() }}>Withdraw</button>
            </div>
          </div>
        </div>) : (
        <p className='subtitle is-6 has-text-centered m-3'>Metamask is a decentralized crypto wallet</p>)}
    </>
  );

    return (
        <div>
            <React.Fragment key="right">
                <Button onClick={toggleDrawer(true)}> <div className="Dark-mode">
                    <AccountBalanceWalletIcon />
                </div></Button>
                <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

