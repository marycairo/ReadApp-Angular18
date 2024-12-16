import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ErrorMessageComponent } from '../../components/error-message/error-message.component'
import { SearchbarComponent } from '../../components/searchbar/searchbar.component'
import { CardLibroComponent } from '../../components/cards/card-libro/card-libro.component'
import { LibrosService } from '../../services/libros/libros.service'
import { Libro } from '../../domain/libro'
import { DataBusquedaLibros } from '../../app.routes'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { state } from '@angular/animations'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ErrorMessageComponent,
    SearchbarComponent,
    CardLibroComponent,
    RouterModule
  ],
  selector: 'app-busqueda-libros',
  templateUrl: './busqueda-libros.component.html',
  styleUrl: './busqueda-libros.component.css'
})
export class BusquedaLibrosComponent implements OnInit {
  libros: Libro[] = []
  librosFiltrados: Libro[] = []
  filterString = ''
  hasError: boolean = false // Variable para controlar el error
  data!: DataBusquedaLibros

  constructor(
    private librosService: LibrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = this.route.snapshot.data as DataBusquedaLibros
    this.search()
  }
  onSearchTextReceived(textToFilter: string): void {
    this.filterString = textToFilter
    this.search()
  }
  async search() {
    this.libros = await this.data.buscar(this.librosService, this.filterString)
    console.log(this.libros)
    console.log(this.data)
  }

  seleccionarLibro(libro: Libro) {
    console.log('llegue a seleccionar libros libros')
    const idRecomendacion = history.state?.idRecomendacion
    const nuevoNombre = history.state?.nuevoNombre || ''
    const nuevoDetalle = history.state?.nuevoDetalle || ''
    const esPublico = history.state?.esPublico || false
    const librosTemporales = history.state?.librosTemporales || []
   
    console.log('Datos recuperados:', {
      idRecomendacion,
      nuevoNombre,
      nuevoDetalle,
      esPublico,
      librosTemporales
    })

    this.router.navigate(['/edicion-de-recomendacion', idRecomendacion], {
      state: { libroSeleccionado: libro, nuevoNombre, nuevoDetalle, esPublico, librosTemporales }
    })
  }

  // ngOnInit(): void {
  //   this.librosService.getLibrosFilter().then(libros => {
  //     this.libros = libros;
  //     this.librosFiltrados = libros;
  //   }).catch(error => {
  //     this.hasError = true;
  //     console.error('Error al cargar los libros', error);
  //   });
  // }
  // async ngOnInit(): Promise<void> {
  //   await this.cargarLibros();
  // }

  // async cargarLibros(): Promise<void> {
  //   try {
  //     this.libros = await this.librosService.getAllLibros();
  //     this.librosFiltrados = this.libros;
  //   } catch (error) {
  //     this.hasError = true; // Cambiar a true si hay error
  //     console.error('Error al cargar los libros', error);
  //   }
  // }

  // buscarLibros(titulo: string): void {
  //   this.librosFiltrados = this.libros.filter(libro =>
  //     libro.titulo?.toLowerCase().includes(titulo.toLowerCase())
  //   );
  // }
}
