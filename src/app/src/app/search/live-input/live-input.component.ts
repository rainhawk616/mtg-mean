import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, tap } from 'rxjs';

@Component({
  selector: 'app-live-input[description][placeholder][value]',
  templateUrl: './live-input.component.html',
  styleUrls: ['./live-input.component.scss']
})
export class LiveInputComponent implements OnInit {
  @Input() public description!: string;
  @Input() public placeholder!: string;
  @Input() public value!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onNgModelChange(value: string) {
    this.valueChange.emit(value);
  }

}
