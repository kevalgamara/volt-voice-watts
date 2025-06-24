
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.60eb60ad48e649668f74dd3f584da067',
  appName: 'volt-voice-watts',
  webDir: 'dist',
  server: {
    url: 'https://60eb60ad-48e6-4966-8f74-dd3f584da067.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
