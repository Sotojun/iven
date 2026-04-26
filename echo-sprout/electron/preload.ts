import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('echoSprout', {
  platform: process.platform
});
