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

      // Call backend API to process the video generation

      // For now, simulate a generated video
      this.generatedVideoUrl = './assets/generated-video.mp4';  // Replace with actual video URL
    } else {
      alert('Please enter text, select an avatar, and select a voice.');
    }
  }

  // generateAvatarVideo() {
  //   if (this.inputText && this.selectedAvatar && this.selectedVoice) {
  //     console.log('Text:', this.inputText);
  //     console.log('Selected Avatar:', this.selectedAvatar);
  //     console.log('Selected Voice:', this.selectedVoice);
  
  //     // Select the avatar image element
  //     const selectedAvatarElement = document.querySelector(`img[class*="selected"]`) as HTMLImageElement;
  
  //     // Ensure we have the selected avatar's image element
  //     if (!selectedAvatarElement) {
  //       alert('Error: No avatar image found.');
  //       return;
  //     }
  
  //     // Fetch the actual image data
  //     fetch(selectedAvatarElement.src)
  //       .then(response => response.blob())
  //       .then(blob => {
  //         // Prepare the form data with text, voice, and image
  //         const formData = new FormData();
  //         formData.append('text', this.inputText);
  //         formData.append('voice', this.selectedVoice);
  //         formData.append('avatarImage', blob, `${this.selectedAvatar}.png`);
  
  //         // Log the FormData content
  //         console.log('FormData content:');
  //         formData.forEach((value, key) => {
  //           console.log(`${key}:`, value);
  //         });
  
  //         // Send the request to the backend API
  //         fetch('https://your-backend-api.com/generateAvatarVideo', {
  //           method: 'POST',
  //           body: formData
  //         })
  //           .then(response => response.json())
  //           .then(data => {
  //             // Handle the backend response
  //             console.log('Video generated:', data);
  //             this.generatedVideoUrl = data.videoUrl;  // Assume the backend returns a video URL
  //           })
  //           .catch(error => {
  //             console.error('Error generating video:', error);
  //             alert('Failed to generate the video. Please try again later.');
  //           });
  //       })
  //       .catch(error => {
  //         console.error('Error fetching the avatar image:', error);
  //       });
  
  //   } else {
  //     alert('Please enter text, select an avatar, and select a voice.');
  //   }
  // }
}  

