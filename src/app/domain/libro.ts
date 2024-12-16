export type AutorJSON = {
    id: number,
    nombre: string,
    apellido: string,
    edad: number,
    ganoPremios: boolean,
    idiomaNativo: string, 
    seudonimo: string
}

export type LibroJSON = {
    id?: number,
    titulo?: string,
    cantidadPalabras?: number, 
    cantidadPaginas?: number, 
    paginasParaSerLargo?: number, 
    cantidadEdiciones?: number, 
    ventasSemanales?: number,
    autor?: AutorJSON,  
    lenguajesTraduccion?: string[],
    lenguajesPublicados?: string[],
    lecturaCompleja?: boolean,
}

export class Autor {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public edad: number,
        public ganoPremios: boolean,
        public idiomaNativo: string,
        public seudonimo:string

    ) { }

    static fromJSON(autorJSON: AutorJSON): Autor {
        return Object.assign(new Autor(0, '', '', 0, false, '', ''), autorJSON);
    }

    toJSON(): AutorJSON {
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            edad: this.edad,
            ganoPremios: this.ganoPremios,
            idiomaNativo: this.idiomaNativo,
            seudonimo: this.seudonimo

        }
    }

    copy(): Autor {
        return Object.assign(new Autor(0, '', '', 0, false, '', ''), this)
    }
}

export class Libro {
    constructor(
        public id?: number,
        public titulo?: string,
        public cantidadPalabras?: number, 
        public cantidadPaginas?: number, 
        public paginasParaSerLargo?: number, 
        public cantidadEdiciones?: number, 
        public ventasSemanales?: number,
        public autor?: Autor,  
        public lenguajesTraduccion?: string[],
        public lenguajesPublicados?: string[],
        public lecturaCompleja?: boolean,
    ) { }

    static fromJSON(libroJSON: LibroJSON): Libro {
        return Object.assign(new Libro(), libroJSON, {
            autor: libroJSON.autor ? Autor.fromJSON(libroJSON.autor) : undefined 
        })
    }
    toJSON(): LibroJSON {
        return {
            id: this.id,
            titulo: this.titulo,
            cantidadPalabras: this.cantidadPalabras,
            cantidadPaginas: this.cantidadPaginas,
            paginasParaSerLargo: this.paginasParaSerLargo, 
            cantidadEdiciones: this.cantidadEdiciones,
            ventasSemanales: this.ventasSemanales,
            autor: this.autor ? this.autor.toJSON() : undefined, 
            lenguajesTraduccion: this.lenguajesTraduccion,
            lenguajesPublicados: this.lenguajesPublicados,
            lecturaCompleja: this.lecturaCompleja,
        }
    }
    copy(): Libro {
        return Object.assign(new Libro(), structuredClone(this), {autor: this.autor ? this.autor.copy() : undefined 
        })
    }
    esLargo() {
        return this.cantidadPaginas !== undefined && this.cantidadPaginas > (this.paginasParaSerLargo || 0)
    }
    esDesafiante() {
        return this.lecturaCompleja || this.esLargo()
    }
    esVariado() {
        return (this.cantidadEdiciones && this.cantidadEdiciones > 2) || (this.lenguajesTraduccion?.length || 0) >= 5
    }
    esBestSeller() {
        return ((this.ventasSemanales && this.ventasSemanales >= 10000) && this.esVariado())
    }
    isDesafiante(): boolean {
        return this.lecturaCompleja!;
    }
    coincideTitulo(texto: string): boolean {
        return this.titulo!.toLowerCase().includes(texto.toLowerCase());
    }
    coincideApellidoAutor(texto: string): boolean {
        return this.autor!.apellido.toLowerCase() === texto.toLowerCase();
    }

}
