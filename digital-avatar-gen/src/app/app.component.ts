import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputText: string = ''; // Holds the text for TTS
  selectedAvatar: string = 'avatar1'; // Holds the selected avatar
  generatedVideoUrl: string | null = null; // Holds the URL of the generated video

  // Function to generate the avatar video
  generateAvatarVideo() {
    // Placeholder logic for generating video
    // You'll integrate this with your backend API to call Google TTS and Automate 1111
    if (this.inputText && this.selectedAvatar) {
      console.log('Text:', this.inputText);
      console.log('Selected Avatar:', this.selectedAvatar);

      // Call backend API to process the video generation

      // For now, simulate a generated video
      this.generatedVideoUrl = 'assets/generated-video.mp4';  // Replace with actual video URL
    } else {
      alert('Please enter text and select an avatar.');
    }
  }
}
