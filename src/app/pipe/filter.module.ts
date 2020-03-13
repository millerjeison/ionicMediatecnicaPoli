import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { Filter2Pipe } from './filter2.pipe';




@NgModule({
  declarations: [FilterPipe, Filter2Pipe],
  exports:[FilterPipe]
})
export class FilterModule { }
