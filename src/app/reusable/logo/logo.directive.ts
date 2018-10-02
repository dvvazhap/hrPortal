import { Directive,ElementRef,Renderer2 } from '@angular/core';

@Directive({
  selector: 'app-logo'
})
export class LogoDirective {
  constructor(elem: ElementRef, renderer: Renderer2) {
    elem.nativeElement.innerHTML = "<img style='width:70%;max-width:400px;' src='../../assets/logo.png'/>"
  }
}
