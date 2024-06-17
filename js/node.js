async function updateCurrentCounter() {
    request = await fetch('https://testnet.xian.org/abci_query?path=%22/get/con_counter.counter%22');
    data = await request.json();
    document.getElementById('counter-value').innerText = atob(data.result.response.value);
}