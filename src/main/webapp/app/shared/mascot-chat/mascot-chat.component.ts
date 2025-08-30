import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // for ngClass
import { FormsModule } from '@angular/forms'; // for ngModel

@Component({
  selector: 'jhi-mascot-chat',
  templateUrl: './mascot-chat.component.html',
  styleUrls: ['./mascot-chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class MascotChatComponent {
  messages: { sender: 'user' | 'ai'; text: string }[] = [{ sender: 'ai', text: "Hi! I'm your TriggerIQ AI host 👋" }];
  userInput = '';

  // Some fake AI responses
  private aiResponses: string[] = [
    'Nice to meet you! 😃',
    'I’m here to help you explore TriggerIQ 🚀',
    'What are you curious about today?',
    'That sounds interesting 🤔',
    'I can’t wait to show you more features!',
  ];

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    this.messages.push({ sender: 'user', text: this.userInput });

    const userMessage = this.userInput;
    this.userInput = '';

    setTimeout(() => {
      const reply = this.aiResponses[Math.floor(Math.random() * this.aiResponses.length)];
      this.messages.push({ sender: 'ai', text: reply });
    }, 1000);
  }
}
