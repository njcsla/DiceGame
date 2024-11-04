const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 700,
        webPreferences: {
            contextIsolation: true,
        },
    });

    win.loadFile('index.html');

    // 창이 열릴 때 디버거 도구 자동으로 열기 - 이건 개발할 때만 주석 풀기
    // win.webContents.openDevTools();

    // F12 키로 디버거 도구 토글
    win.webContents.on('before-input-event', (event, input) => {
        if (input.key === 'F12' && input.type === 'keyDown') {
            event.preventDefault();
            win.webContents.toggleDevTools();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
