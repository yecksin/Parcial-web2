import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroBuscarUsuario'
})
export class FiltroBuscarUsuarioPipe implements PipeTransform {

  transform(arreglo: any[], texto:String): any[] {
    if(texto === ''){
      return [];
    }

    texto = texto.toLocaleLowerCase();
    return arreglo.filter(item=>{
      let contcat =item.email+item.phone;
      return contcat.includes(texto)
    })

  }

}
