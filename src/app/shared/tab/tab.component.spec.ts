import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TabComponent } from './tab.component';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  it('should have .hidden class', () => {
    //1 best solution. works on no browser too
    const element = fixture.debugElement.query(
      By.css('.hidden')
    )
    //2
    const element2 = fixture.nativeElement.querySelector('.hidden')
    //3. not recommended 
    const element3 = document.querySelector('.hidden');

    // expect(element).toBeTruthy();
  });

  it('should not have .hidden class', () => {
    component.active = true;
    fixture.detectChanges();

    //1 best solution. works on no browser too
    const element = fixture.debugElement.query(
      By.css('.hidden')
    )
    //2
    const element2 = fixture.nativeElement.querySelector('.hidden')
    //3. not recommended 
    const element3 = document.querySelector('.hidden');

    //1
    // expect(element).toBeFalsy();
    
    //2
    // expect(element).not.toBeTruthy();

  });


});
