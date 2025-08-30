import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotChatComponent } from './mascot-chat.component';

describe('MascotChatComponent', () => {
  let component: MascotChatComponent;
  let fixture: ComponentFixture<MascotChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotChatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MascotChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
