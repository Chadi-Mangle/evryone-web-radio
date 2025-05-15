// Import styles
import './style.css';

// Import modules
import AudioPlayer from './ts/player';
import LogoAnimation from './ts/animation';

/**
 * Setup logo image source
 */
function setupImageSources(): void {
  // Logo and favicon are handled via HTML, no need to set them here
}

/**
 * Main application initialization
 */
document.addEventListener('DOMContentLoaded', () => {
  // Setup image sources
  setupImageSources();

  // Initialize audio player
  const player = new AudioPlayer();
  player.init();
  
  // Initialize logo animation
  const logoAnimation = new LogoAnimation();
  logoAnimation.init();
  
  // Connect the two systems
  player.setPlayStateChangeCallback((isPlaying: boolean) => {
    logoAnimation.setPlaybackState(isPlaying);
  });
});
