import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9350;
const USER_DATA_DIR = `/tmp/chrome_qa_profile_${Date.now()}`;
const OUTPUT_DIR = '/Users/lakshyabapna/.gemini/antigravity-ide/brain/54005c09-83c8-4bc8-bc60-cd33d48710de/qa_screenshots';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('Launching headless Chrome on port', PORT);
  const chromeProcess = spawn(
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
        const versionRes = await fetch(`http://127.0.0.1:${PORT}/json/list`);
        tabs = await versionRes.json();
        if (tabs.length > 0) break;
      } catch {
        await sleep(500);
      }
    }
    const pageTab = tabs.find((t) => t.type === 'page');
    if (!pageTab?.webSocketDebuggerUrl) throw new Error('No page debugger url found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

    await new Promise((res) => {
      ws.onopen = res;
    });

    let id = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        pending.get(data.id)(data);
        pending.delete(data.id);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve) => {
        const reqId = id++;
        pending.set(reqId, resolve);
        ws.send(JSON.stringify({ id: reqId, method, params }));
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

    // 1. Navigate to Home
    console.log('Navigating to http://localhost:5173/ ...');
    await send('Page.navigate', { url: 'http://localhost:5173/' });

    // 1a. Capture Title Card in Intro (~0.8s)
    await sleep(800);
    await capture('01_intro_title.png', 'Intro Title Card (Entering Bernabéu)');

    // 1b. Capture Football Entry in Intro (~2.2s more -> ~3.0s)
    await sleep(2000);
    await capture('02_intro_football.png', 'Intro Football Flight on Pitch');

    // 1c. Wait for Home Hero to settle (~1.5s more -> ~4.5s total)
    await sleep(1800);
    await capture('03_home_hero.png', 'Home Hero Dusk Stadium Environment');

    // 2. The Player Page
    console.log('Navigating to The Player...');
    await send('Runtime.evaluate', { expression: `window.location.hash = '#the-player';` });
    await sleep(1000);
    await capture('04_the_player.png', 'The Player Editorial Profile and Collectible Card');

    // 3. Skills Page
    console.log('Navigating to Skills...');
    await send('Runtime.evaluate', { expression: `window.location.hash = '#skills';` });
    await sleep(1000);
    await capture('05_skills_technical_map.png', 'Skills Technical Map and Passing Lanes');

    // 4. Starting XI Pitch & Lineup
    console.log('Navigating to Starting XI...');
    await send('Runtime.evaluate', { expression: `window.location.hash = '#starting-xi';` });
    // Let pitch reveal sequence run (GK -> DEF -> MID -> FWD -> Lock) ~3.8s
    await sleep(4000);
    await capture('06_starting_xi_pitch.png', 'Starting XI Green Turf & 11 Project Formation');

    // 5. Open Project Dossier (Click on #10 InterviAI)
    console.log('Selecting project card #10 (InterviAI)...');
    await send('Runtime.evaluate', {
      expression: `
        const btn = document.querySelectorAll('.xi-player-btn')[1];
        if (btn) btn.click();
      `,
    });
    await sleep(1000);
    await capture('07_project_dossier_drawer.png', 'Compact 380px Image-First Project Dossier Drawer');

    // 6. Timeline Page
    console.log('Navigating to Timeline...');
    await send('Runtime.evaluate', { expression: `window.location.hash = '#timeline';` });
    await sleep(1000);
    await capture('08_timeline.png', 'Career Timeline Season Journey');

    // 7. Connect Page
    console.log('Navigating to Connect...');
    await send('Runtime.evaluate', { expression: `window.location.hash = '#connect';` });
    await sleep(1000);
    await capture('09_connect.png', 'Connect Final Whistle');

    // 8. Mobile Viewport (390x844)
    console.log('Testing Mobile Viewport (390x844)...');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await send('Runtime.evaluate', { expression: `window.location.hash = '#starting-xi';` });
    await sleep(1000);
    await capture('10_mobile_starting_xi.png', 'Mobile 390px Starting XI Tactical List');

    await send('Runtime.evaluate', { expression: `window.location.hash = '#home';` });
    await sleep(1000);
    await capture('11_mobile_home.png', 'Mobile 390px Home Hero');

    ws.close();
    console.log('Visual QA capture completed successfully!');
  } catch (err) {
    console.error('Error during QA capture:', err);
  } finally {
    chromeProcess.kill();
  }
}

main();
