import { Component, Input, output } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-my-recom-searchbar',
  standalone: true,
  imports: [FormsModule],
  template: `
  <input (input)="onSearch($event.target.value)" placeholder="Buscar libros..." />
`,
  templateUrl: './my-recom-searchbar.component.html',
  styleUrl: './my-recom-searchbar.component.css'
})
export class MyRecomSearchbarComponent {
  searchText: string = '';
  @Input() showCheckbox!: boolean
  public searchTextChange = output<string>();
  public checkboxChange = output<boolean>();
  
  onSearch() {
    this.searchTextChange.emit(this.searchText) // Emitimos el valor correcto (un string)
    console.log(this.searchText)
  }
  onCheckboxChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked; // Obtenemos el estado del checkbox
    this.checkboxChange.emit(isChecked);  // Emitimos el estado (true o false)
  }

  async ngOnInit(): Promise<void> {
    console.log(this.showCheckbox)
  }

}
