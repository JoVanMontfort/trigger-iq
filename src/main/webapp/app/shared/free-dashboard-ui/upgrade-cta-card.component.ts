import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-upgrade-cta-card',
  templateUrl: './upgrade-cta-card.component.html',
})
export class UpgradeCtaCardComponent implements OnInit {
  showBanner = true;
  showCard = false;

  ngOnInit(): void {
    console.log('UpgradeCtaCardComponent loaded. Banner shown:', this.showBanner);
  }

  openCard(): void {
    console.log('Opening card...');
    this.showBanner = false;
    this.showCard = true;
  }

  closeCard(): void {
    console.log('Closing card...');
    this.showCard = false;
  }
}
