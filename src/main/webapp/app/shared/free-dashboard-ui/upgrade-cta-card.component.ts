import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'jhi-upgrade-cta-card',
  templateUrl: './upgrade-cta-card.component.html',
  imports: [CommonModule],
})
export class UpgradeCtaCardComponent implements OnInit {
  showBanner = true;
  showCard = false;

  constructor(private logger: LoggingService) {}

  ngOnInit(): void {
    this.logger.log('UpgradeCtaCardComponent loaded. Banner shown: ' + String(this.showBanner));
  }

  openCard(): void {
    this.logger.log('Opening card...');
    this.showBanner = false;
    this.showCard = true;
  }

  closeCard(): void {
    this.logger.log('Closing card...');
    this.showCard = false;
  }
}
