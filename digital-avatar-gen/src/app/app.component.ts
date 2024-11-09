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
  inputText: string = '';
  selectedAvatar: string = 'avatar1';
  selectedVoice: string = 'neutral';
  generatedVideoUrl: string | null = null;
  isLoading: boolean = false;
  useUploadedImage: boolean = false;
  uploadedImageFile: File | null = null;

  // Variables for filename received from thee server and pollingInterval counter
  fileName: string = '';
  private pollingInterval: any;

  constructor(private http: HttpClient) {}

  // Function to select an avatar
  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar;
  }

  // Handle image file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadedImageFile = file;
    }
  }



  // Function to generate the avatar video
  generateAvatarVideo() {
    this.generatedVideoUrl = null;
  
    if (this.inputText && this.selectedVoice && (this.selectedAvatar || this.uploadedImageFile)) {
      console.log('Text:', this.inputText);
      console.log('Selected Voice:', this.selectedVoice);
  
      // Prepare form data to send to the backend
      const formData = new FormData();
      formData.append('text', this.inputText);
      formData.append('voice', this.selectedVoice);
  
      this.isLoading = true;
  
      if (this.useUploadedImage && this.uploadedImageFile) {
        // Use the uploaded image file
        formData.append('image', this.uploadedImageFile, this.uploadedImageFile.name);
        this.sendRequest(formData);
      } else {
        // Load the selected avatar image from assets as a Blob
        this.http.get(`./assets/${this.selectedAvatar}.png`, { responseType: 'blob' })
          .subscribe((avatarBlob: Blob) => {
            formData.append('image', avatarBlob, `${this.selectedAvatar}.png`);
            this.sendRequest(formData);
          }, (error) => {
            console.error('Error loading avatar image:', error);
            alert('Failed to load the avatar image. Please try again later.');
            this.isLoading = false;
          });
      }
    } else {
      alert('Please enter text, select an avatar or upload an image, and select a voice.');
    }
  }
  
  checkVideoStatus() {
    this.pollingInterval = setInterval(() => {
      this.http.get<any>(`http://10.96.50.100:5000/check-video-status?file_name=${this.fileName}`).subscribe(response => {
        if (response.status === 'completed') {
          clearInterval(this.pollingInterval);
          this.getVideo()
          //this.isLoading = false;
          //this.generatedVideoUrl = response.video_path;
        }
      });
    }, 60000);  // Poll every 1 min = 60 seconds
  }

 getVideo()
 {
  this.http.post('http://10.96.50.100:5000/getVideo', { fileName: this.fileName }, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const videoBlob = new Blob([response], { type: 'video/mp4' });
        this.generatedVideoUrl = URL.createObjectURL(videoBlob);
        this.isLoading = false;
      }, (error) => {
        console.error('Error generating video:', error);
        alert('Failed to generate the video. Please try again later.');
        this.generatedVideoUrl = './assets/generated-video.mp4';
        this.isLoading = false;
      });
 }
 
  // Separate function to send the form data request
  private sendRequest(formData: FormData) {
    console.log('formData', formData.get('image'));
    this.http.post<any>('http://10.96.50.100:5000/generate', formData,).subscribe(response => {
      this.fileName = response.file_name;
      this.checkVideoStatus();  // Start polling
    });
    /*
    this.http.post('http://10.96.50.100:5000/generate', formData, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        const videoBlob = new Blob([response], { type: 'video/mp4' });
        this.generatedVideoUrl = URL.createObjectURL(videoBlob);
        this.isLoading = false;
      }, (error) => {
        console.error('Error generating video:', error);
        alert('Failed to generate the video. Please try again later.');
        this.generatedVideoUrl = './assets/generated-video.mp4';
        this.isLoading = false;
      });
      */


  }

}
