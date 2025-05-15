/**
 * animation.ts
 * Handles all animation-related functionality for Evryone Web Radio
 * Specifically manages logo rotation and hover effects
 */

class LogoAnimation {
  private logoContainer: HTMLElement;
  private logoImage: HTMLImageElement;
  private rotationAngle: number = 0;
  private rotationSpeed: number = 0.3;
  private lastTimestamp: number = 0;
//   private animationId: number | null = null;
  private isPlaying: boolean = false;

  constructor() {
    this.logoContainer = document.querySelector('.logo-container') as HTMLElement;
    this.logoImage = document.getElementById('logo-image') as HTMLImageElement;
  }

  /**
   * Initializes the animation system
   */
  public init(): void {
    // this.animationId = requestAnimationFrame(this.rotateLogo.bind(this));
    requestAnimationFrame(this.rotateLogo.bind(this));
  }

  /**
   * Updates the logo rotation animation
   * @param {number} timestamp - Current animation frame timestamp
   */
  private rotateLogo(timestamp: number): void {
    // Initialize timestamp on first call
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    
    // Calculate time elapsed since last frame
    const elapsed: number = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    // Check if logo is hovered
    const isHovered: boolean = this.logoContainer.matches(':hover');
    
    // Update rotation angle if audio is playing
    if (this.isPlaying) {
      this.rotationAngle += (this.rotationSpeed * elapsed) / 16.67; // Adjusted for 60 FPS
    }

    // Apply transforms - rotation and conditional scale effect
    if (isHovered) {
      this.logoImage.style.transform = `rotate(${this.rotationAngle}deg) scale(1.05)`;
    } else {
      this.logoImage.style.transform = `rotate(${this.rotationAngle}deg)`;
    }
    
    // Continue animation loop
    // this.animationId = requestAnimationFrame(this.rotateLogo.bind(this));
    requestAnimationFrame(this.rotateLogo.bind(this));
  }

  /**
   * Updates the playback state for animation
   * @param {boolean} isPlaying - Current playback state
   */
  public setPlaybackState(isPlaying: boolean): void {
    this.isPlaying = isPlaying;
  }
}

// Export the animation class
export default LogoAnimation;
