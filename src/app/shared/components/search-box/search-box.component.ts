import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit,OnDestroy{


  private debouncer:Subject<string>=new Subject<string>(); //******ESTO ES PARA EL DEBOUNCER*******/

  @Input()
  public placeholder:string='';
  @Input()
  public initialValue:string='';

  @Output()
  public onValue:EventEmitter<string>=new EventEmitter();

  @Output()
  public onDebounce:EventEmitter<string>=new EventEmitter();  //******ESTO ES PARA EL DEBOUNCER*******/

  ngOnInit(): void {
                                                              //******ESTO ES PARA EL DEBOUNCER*******/
    //Dejo inicializado el debouncer al cargar el componente
    this.debouncer
    .pipe(
      debounceTime(2000) //Si no pasa ese segundo antes de una nueva emisión no hace nada
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
    });
  }
  ngOnDestroy(): void {
    //Aquí limpiamos ese subscribe que sólo usamos en este componente (el subscribe del debouncer)
   this.debouncer.unsubscribe(); //Esto es para todos los subscribe que no tengan que ver
                                //con peticiones HTTP
  }

  emitValue(value:string){
    this.onValue.emit(value);
  }

  //Este método es para que se dispare la petición una vez el usuario ha dejado de escribir
  // en el input por cierto tiempo. DEBOUNCE
  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm); //******ESTO ES PARA EL DEBOUNCER*******/
  }

}
