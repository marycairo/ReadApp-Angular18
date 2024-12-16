import { Pipe, PipeTransform } from "@angular/core";
import { Recomendacion } from "../domain/recomendacion";

@Pipe({
  name: "recomendFilter",
  standalone: true,
  pure: true
})
export class RecomendFilterPipe implements PipeTransform {

    transform(recomendaciones: Recomendacion[], showPrivate: boolean): Recomendacion[] {
        if (!recomendaciones) {
            console.log("No hay recomendaciones")       
            return []
        }
        if (showPrivate) {
            console.log("hay recomendaciones") 
            return recomendaciones.filter(recomendacion => recomendacion.esPublico() === false)
        }
        return recomendaciones;
    }

}