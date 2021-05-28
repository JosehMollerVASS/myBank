import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TokenizedKeyboradComponent } from './tokenized-keyborad.component';

describe('TokenizedKeyboradComponent', () => {
  let component: TokenizedKeyboradComponent;
  let fixture: ComponentFixture<TokenizedKeyboradComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenizedKeyboradComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TokenizedKeyboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
