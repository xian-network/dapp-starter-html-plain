const walletAddressElement = document.getElementById('wallet-address');
const incrementButtonElement = document.getElementById('increment-button');

function showToast(message, type) {
    bulmaToast.toast({
        message,
        type,
        position: "top-center",
        duration: 5000
    });
}

function handleWalletInfo(info) {
    walletAddressElement.innerText = info.address.slice(0, 10) + '...';
    if (info.locked) {
        walletAddressElement.innerText = 'Wallet is Locked';
        showToast("Your wallet is locked. Please unlock it to interact with the dapp.", "is-warning");
    }
}

function handleWalletError(error) {
    showToast("You don't have the Xian Wallet extension installed. Please install it to interact with the dapp.", "is-danger");
    walletAddressElement.innerText = 'Wallet not installed';
}

function handleTransaction(response) {
    if (response.errors) {
        console.error('Transaction failed:', response.errors);
        showToast("Transaction failed: " + response.errors, "is-danger");
        return;
    }
    console.log('Transaction succeeded:', response);
    showToast("Transaction succeeded", "is-success");
    updateCurrentCounter();
}

function handleTransactionError(error) {
    console.error('Transaction error:', error);
    showToast("Transaction error: " + error, "is-danger");
}

updateCurrentCounter();

XianWalletUtils.init('https://testnet.xian.org');

XianWalletUtils.requestWalletInfo()
    .then(handleWalletInfo)
    .catch(handleWalletError);

incrementButtonElement.addEventListener('click', async () => {
    XianWalletUtils.sendTransaction("con_counter", "increment_counter", {})
        .then(handleTransaction)
        .catch(handleTransactionError);
});