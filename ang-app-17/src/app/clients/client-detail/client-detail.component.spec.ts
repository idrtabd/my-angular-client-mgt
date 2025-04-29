import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientDetailComponent } from './client-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '123', // <-- Mock client ID
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clientId from route', () => {
    expect(component.clientId).toBe('123');
  });
});
