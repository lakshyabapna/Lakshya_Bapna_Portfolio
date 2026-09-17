import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9352;
const USER_DATA_DIR = `/tmp/chrome_intro_qa_${Date.now()}`;
const OUTPUT_DIR = '/Users/lakshyabapna/.gemini/antigravity-ide/brain/54005c09-83c8-4bc8-bc60-cd33d48710de/qa_screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function captureRun() {
  console.log('Launching headless Chrome on port', PORT);
  const chrome = spawn(
    CHROME_PATH,
    [
      `--remote-debugging-port=${PORT}`,
      `--user-data-dir=${USER_DATA_DIR}`,
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--window-size=1440,900',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  await sleep(1500);

  try {
    let tabs = [];
    for (let i = 0; i < 10; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        tabs = await res.json();
        if (tabs.length > 0) break;
      } catch {
        await sleep(400);
      }
    }

    const pageTab = tabs.find((t) => t.type === 'page');
    if (!pageTab?.webSocketDebuggerUrl) throw new Error('No page debugger url found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise((r) => { ws.onopen = r; });

    let msgId = 1;
    const callbacks = new Map();
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        callbacks.get(data.id)(data);
        callbacks.delete(data.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('DOM.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    async function capture(filename, description) {
      console.log(`Capturing: ${description} -> ${filename}`);
      const res = await send('Page.captureScreenshot', { format: 'png' });
      const buffer = Buffer.from(res.result.data, 'base64');
      const filepath = path.join(OUTPUT_DIR, filename);
      fs.writeFileSync(filepath, buffer);
      console.log(`Saved: ${filepath}`);
    }

    // --- DESKTOP CAPTURE SEQUENCE ---
    // Session 1: capture at ~0.5s
    console.log('Navigating for 0.5s capture...');
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(200);
    await send('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(500);
    await capture('intro_01_05s.png', 'Intro ~0.5s: Soft Dark Frame / Stadium Emerging');

    // Session 2: capture at ~1.2s
    console.log('Navigating for 1.2s capture...');
    await send('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(1200);
    await capture('intro_02_12s.png', 'Intro ~1.2s: Roof + Stands + Pitch Visible & ENTERING');

    // Session 3: capture at ~2.0s
    console.log('Navigating for 2.0s capture...');
    await send('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2000);
    await capture('intro_03_20s.png', 'Intro ~2.0s: LAKSHYA BAPNA & PORTFOLIO in Stadium Bowl');

    // Session 4: capture at ~2.8s (dissolve) and ~3.4s (settled home hero)
    console.log('Navigating for 2.8s dissolve and 3.4s home settled capture...');
    await send('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2750);
    await capture('intro_04_28s.png', 'Intro ~2.8s: Smooth Continuous Dissolve into Home Hero');
    await sleep(700);
    await capture('intro_05_home_settled.png', 'Home Hero ~3.4s: Full Settled Stadium Home');

    // Session 5: Mobile Viewport (390x844)
    console.log('Switching to mobile viewport (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Runtime.evaluate', { expression: `sessionStorage.clear();` });
    await send('Page.navigate', { url: 'http://localhost:5173/' });
    await sleep(2000);
    await capture('intro_06_mobile_20s.png', 'Mobile 390px Intro ~2.0s: Responsive Stadium Entry');

    ws.close();
    console.log('ALL INTRO QA SCREENSHOTS CAPTURED SUCCESSFULLY!');
  } catch (err) {
    console.error('Error during QA capture:', err);
  } finally {
    chrome.kill();
  }
}

captureRun();
