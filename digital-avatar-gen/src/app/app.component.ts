import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { response } from 'express';

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
  isLoading: boolean = false; // Track loading state

  // Function to select an avatar
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  // Function to generate the avatar video
  generateAvatarVideo() {
    // Remove the already showing video by resetting the generatedVideoUrl
    this.generatedVideoUrl = null; // Clear previous video

    if (this.inputText && this.selectedAvatar && this.selectedVoice) {
      console.log('Text:', this.inputText);
      console.log('Selected Avatar:', this.selectedAvatar);
      console.log('Selected Voice:', this.selectedVoice);
  
      // Prepare the payload to send to the backend API
      const payload = {
        text: this.inputText,
        voice: this.selectedVoice,
        avatar_name: `${this.selectedAvatar}.png`  // Assuming the avatar image is in assets
      };
  
      // Log the payload to the console before sending the request
      console.log('Payload to be sent to API:', payload);

      // Set loading state to true
      this.isLoading = true;
  
      // Call the backend API to process the video generation
      //Adding URL of the server and the specifying the type of response received - Akansha
      this.http.post('http://10.96.50.100:5000/generate', payload,{  responseType: 'blob' }) 
        .subscribe((response: Blob) => {
          // Declaring the parameters to receive the video from the server - Akansha
          const videoBlob = new Blob([response], { type: 'video/mp4' });
          this.generatedVideoUrl = URL.createObjectURL(videoBlob); // Creating a URL for the video blob - Akansha
          // Reset loading state */
          this.isLoading = false;
        }, (error) => {
          console.error('Error generating video:', error);
          alert('Failed to generate the video. Please try again later.');
          this.generatedVideoUrl = './assets/generated-video.mp4';  // Fallback video URL // 
          // Reset loading state
          this.isLoading = false;
        });
  
    } else {
      alert('Please enter text, select an avatar, and select a voice.');
    }
  }
}  

