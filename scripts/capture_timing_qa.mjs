import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9360;
const USER_DATA_DIR = `/tmp/chrome_timing_qa_${Date.now()}`;
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
      '--no-sandbox',
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
      deviceScaleFactor: 2,
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

    // Capture sequence with precise timing
    const checkpoints = [
      { timeMs: 1000, file: 'timing_01_10s.png', desc: '1.0s — Stadium Entry (roof/stands emerging, subtle push-in, no text)' },
      { timeMs: 2000, file: 'timing_02_20s.png', desc: '2.0s — Environment Settles (stadium breathing, crowd & pitch visible, no text)' },
      { timeMs: 3000, file: 'timing_03_30s.png', desc: '3.0s — Editorial Eyebrow (BUILD · LEARN · PLAY · CREATE)' },
      { timeMs: 4000, file: 'timing_04_40s.png', desc: '4.0s — Name Reveal (LAKSHYA BAPNA hero reveal)' },
      { timeMs: 5000, file: 'timing_05_50s.png', desc: '5.0s — Role (AI / Full-Stack Developer)' },
      { timeMs: 6500, file: 'timing_06_65s.png', desc: '6.5s — Actions (Explore Projects & View Resume)' },
      { timeMs: 8200, file: 'timing_07_settled.png', desc: 'Final Settled State — Full hero with telemetry' },
    ];

    for (const cp of checkpoints) {
      console.log(`Preparing run for ${cp.timeMs}ms...`);
      await send('Page.navigate', { url: 'about:blank' });
      await sleep(150);
      const startNav = Date.now();
      await send('Page.navigate', { url: 'http://localhost:5173/' });
      
      const elapsedSoFar = Date.now() - startNav;
      const waitTime = Math.max(0, cp.timeMs - elapsedSoFar);
      await sleep(waitTime);
      await capture(cp.file, cp.desc);
    }

    console.log('ALL TIMING CHECKPOINTS CAPTURED SUCCESSFULLY!');
  } finally {
    chrome.kill();
  }
}

captureRun().catch((err) => {
  console.error('Error during capture:', err);
  process.exit(1);
});
