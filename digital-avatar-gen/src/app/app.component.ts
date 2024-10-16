import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule],
})

export class AppComponent {

  constructor(private http: HttpClient) {}

  inputText: string = ''; // Holds the text for TTS
  selectedAvatar: string = 'avatar1'; // Holds the selected avatar
  selectedVoice: string = 'neutral'; // Holds the selected voice
  generatedVideoUrl: string | null = null; // Holds the URL of the generated video

  // Function to select an avatar
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  // Function to generate the avatar video
  generateAvatarVideo() {
    if (this.inputText && this.selectedAvatar && this.selectedVoice) {
      console.log('Text:', this.inputText);
      console.log('Selected Avatar:', this.selectedAvatar);
      console.log('Selected Voice:', this.selectedVoice);
  
      // Prepare the payload to send to the backend API
      const payload = {
        text: this.inputText,
        voice: this.selectedVoice,
        avatarPath: `./assets/${this.selectedAvatar}.png`  // Assuming the avatar image is in assets
      };
  
      // Log the payload to the console before sending the request
      console.log('Payload to be sent to API:', payload);
  
      // Call the backend API to process the video generation
      this.http.post('https://localhost:8080/generateAvatarVideo', payload)
        .subscribe((response: any) => {
          // Assuming the response contains the URL of the generated video
          this.generatedVideoUrl = './assets/generated-video.mp4';  // Replace with actual video URL from response
        }, (error) => {
          console.error('Error generating video:', error);
          alert('Failed to generate the video. Please try again later.');
          this.generatedVideoUrl = './assets/generated-video.mp4';  // Fallback video URL
        });
  
    } else {
      alert('Please enter text, select an avatar, and select a voice.');
    }
  }
}  

