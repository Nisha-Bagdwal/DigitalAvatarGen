import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule],
})

export class AppComponent {
  inputText: string = ''; // Holds the text for TTS
  selectedAvatar: string = 'avatar1'; // Holds the selected avatar
  generatedVideoUrl: string | null = null; // Holds the URL of the generated video
  selectedVoice: string = 'FEMALE';

  // Function to select an avatar
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }
  
  // Function to generate the avatar video
  generateAvatarVideo() {
  
    if (this.inputText && this.selectedAvatar) {
      console.log('Text:', this.inputText);
      console.log('Selected Avatar:', this.selectedAvatar);

      // Call backend API to process the video generation

      // For now, simulate a generated video
      this.generatedVideoUrl = './assets/generated-video.mp4';  // Replace with actual video URL
    } else {
      alert('Please enter text and select an avatar.');
    }
  }
}
