import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesFuturasComponent } from './actividadesFuturas.component';

describe('ActividadesFuturasComponent', () => {
  let component: ActividadesFuturasComponent;
  let fixture: ComponentFixture<ActividadesFuturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesFuturasComponent]
    });
    fixture = TestBed.createComponent(ActividadesFuturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
