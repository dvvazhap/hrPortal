import { Directive,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLogo]'
})
export class LogoDirective {
  constructor(elem: ElementRef, renderer: Renderer2) {
    elem.nativeElement.innerHTML = "<img style='width:70%;' src='../../assets/logo.png'/>"
  }
}
