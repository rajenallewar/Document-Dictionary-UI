import { Directive, ElementRef, Output, EventEmitter, HostListener} from "@angular/core";
@Directive({
    selector:'[cliclOutside]'
})

export class cliclOutsideDirective{
    @Output() public clickOutside = new EventEmitter();
    
    constructor(private _elementRef: ElementRef){}
    
    @HostListener('document:click',['$event.target'])
    public onClick(targetElement){
        if(targetElement.id === 'newTagInput'){  return }
        const isClickedInside = this._elementRef.nativeElement.contains(targetElement);
        if(!isClickedInside){
            this.clickOutside.emit(null);
        }
    }
}