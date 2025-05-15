/**
 * player.ts
 * Handles audio playback functionality for Evryone Web Radio
 * Controls playback, volume, and player UI state
 */

class AudioPlayer {
  private audioElement: HTMLAudioElement;
  private playPauseButton: HTMLButtonElement;
  private playPauseIcon: HTMLElement;
  private volumeControl: HTMLInputElement;
  private listenButton: HTMLButtonElement;
  private listenButtonIcon: HTMLElement;
  private closeButton: HTMLButtonElement;
  private playerBar: HTMLElement;
//   private nowPlayingDetails: HTMLElement;
  
  // State
  private isPlaying: boolean = false;
  
  // Callbacks
  private onPlayStateChange: ((isPlaying: boolean) => void) | null = null;

  constructor() {
    // Player elements
    this.audioElement = document.getElementById('radioPlayer') as HTMLAudioElement;
    this.playPauseButton = document.getElementById('playPauseButton') as HTMLButtonElement;
    this.playPauseIcon = this.playPauseButton.querySelector('i') as HTMLElement;
    this.volumeControl = document.getElementById('volumeControl') as HTMLInputElement;
    this.listenButton = document.getElementById('listenButton') as HTMLButtonElement;
    this.listenButtonIcon = this.listenButton.querySelector('i') as HTMLElement;
    this.closeButton = document.getElementById('closeButton') as HTMLButtonElement;
    this.playerBar = document.getElementById('audio-player-bar') as HTMLElement;
    // this.nowPlayingDetails = document.getElementById('now-playing-details') as HTMLElement;
  }

  /**
   * Initializes the audio player
   */
  public init(): void {
    // Set initial volume
    this.audioElement.volume = parseFloat(this.volumeControl.value);
    
    // Set up event listeners
    this.setupEventListeners();
  }

  /**
   * Set up all player-related event listeners
   */
  private setupEventListeners(): void {
    // Main player controls
    this.playPauseButton.addEventListener('click', this.togglePlay.bind(this));
    
    // CTA button in hero section
    this.listenButton.addEventListener('click', () => {
      if (!this.isPlaying) {
        this.togglePlay();
      }
    });
    
    // Volume control
    this.volumeControl.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.audioElement.volume = parseFloat(target.value);
    });
    
    // Close/minimize button
    this.closeButton.addEventListener('click', () => {
      this.playerBar.classList.toggle('minimized');
    });
  }

  /**
   * Toggles audio playback state
   */
  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  /**
   * Starts audio playback
   */
  public play(): void {
    this.audioElement.play()
      .then(() => {
        this.isPlaying = true;
        this.updatePlaybackUI(true);
        
        // Notify animation system if callback is set
        if (this.onPlayStateChange) {
          this.onPlayStateChange(true);
        }
      })
      .catch((error: Error) => {
        console.error("Error playing audio:", error);
      });
  }
  
  /**
   * Pauses audio playback
   */
  public pause(): void {
    this.audioElement.pause();
    this.isPlaying = false;
    this.updatePlaybackUI(false);
    
    // Notify animation system if callback is set
    if (this.onPlayStateChange) {
      this.onPlayStateChange(false);
    }
  }
  
  /**
   * Updates UI elements to reflect current playback state
   * @param {boolean} isPlaying - Current playback state
   */
  private updatePlaybackUI(isPlaying: boolean): void {
    // Update play/pause button icon
    if (isPlaying) {
      this.playPauseIcon.classList.remove('fa-play');
      this.playPauseIcon.classList.add('fa-pause');
      this.listenButtonIcon.classList.remove('fa-play');
      this.listenButtonIcon.classList.add('fa-pause');
    } else {
      this.playPauseIcon.classList.remove('fa-pause');
      this.playPauseIcon.classList.add('fa-play');
      this.listenButtonIcon.classList.remove('fa-pause');
      this.listenButtonIcon.classList.add('fa-play');
    }
  }
  
  /**
   * Sets callback for playback state changes
   * @param {function} callback - Function to call when playback state changes
   */
  public setPlayStateChangeCallback(callback: (isPlaying: boolean) => void): void {
    this.onPlayStateChange = callback;
  }
}

// Export the player class
export default AudioPlayer;
