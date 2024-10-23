import { Component,ElementRef,EventEmitter,Input,Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder:string='';

  @Output()
  public onValue:EventEmitter<string>=new EventEmitter();

  // @ViewChild('txtInput')
  // public searchInput!:ElementRef<HTMLInputElement>;

  // emitValue():void{
  //   this.onValue.emit(this.searchInput.nativeElement.value);
  // }
  emitValue(value:string){
    this.onValue.emit(value);
  }

}
