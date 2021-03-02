import '@babel/polyfill';
import fs from 'fs';
import { app, BrowserWindow, ipcMain } from 'electron';
import YoutubeMp3Downloader from 'youtube-mp3-downloader';
import { AudioContext } from 'web-audio-api';
import { calcTempo } from './utils';


const isDev = (process.env.NODE_ENV === 'development');
const outPutPath = app.getPath('temp');
const ffmpegPath = isDev
  ? require('@ffmpeg-installer/ffmpeg').path
  : require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');

const YD = new YoutubeMp3Downloader({
  'ffmpegPath': ffmpegPath,
  'outputPath': outPutPath,
  'youtubeVideoQuality': 'highest',
  'queueParallelism': 2,
  'progressTimeout': 500
});

let mainWindow: Electron.BrowserWindow | null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    backgroundColor: 'rgb(54, 33, 100)',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL((process.env.NODE_ENV === 'development')
    ? 'http://localhost:4000'
    : `file://${app.getAppPath()}/dist/renderer/index.html`
  );

  mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.allowRendererProcessReuse = true;

ipcMain.on('upload', (event, { videoId }) => {
  // TODO: Try loading results from server

  event.sender.send('percentage', 15);

  YD.download(videoId, `${videoId}.mp3`);

  YD.on('progress', ({ progress }) => {
    const { percentage } = progress;
    if (percentage > 20 && percentage < 80) {
      event.sender.send('percentage', percentage);
    }
  });


  YD.on('error', error => event.sender.send('error', error));

  YD.on('finished', async () => {
    const context = new AudioContext();
    event.sender.send('percentage', 81);

    context.decodeAudioData(fs.readFileSync(`${outPutPath}/${videoId}.mp3`), async (buffer: AudioBuffer) => {
      const { tempo: bpm } = calcTempo(buffer);
      event.sender.send('percentage', 100);
      event.sender.send('result', Math.round(bpm));
      fs.unlink(`${outPutPath}/${videoId}.mp3`, err => console.error(err));

      // TODO: Save results on the server
    });
  });
});
