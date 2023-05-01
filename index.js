const p = require('./inqiurer/index');
const w = require('./lib/index');




const init = async () => {
    const initialPrompt = await p.RunApp();
    w.SwitchCase(initialPrompt);
}

init();