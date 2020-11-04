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
      return item.email.includes(texto)
    })

  }

}
