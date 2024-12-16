import { Component, EventEmitter, output } from '@angular/core'
import { FormsModule } from '@angular/forms'
@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <input (input)="onSearch($event.target.value)" placeholder="Buscar libros..." />
  `,
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})

export class SearchbarComponent {
  searchText: string = '';

  public searchTextChange = output<string>();
  
  onSearch() {
    this.searchTextChange.emit(this.searchText) // Emitimos el valor correcto (un string)
    console.log(this.searchText)
  }

  // @Output() search = new EventEmitter<string>();

  // onSearch(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   this.search.emit(input.value);
  // }
}
