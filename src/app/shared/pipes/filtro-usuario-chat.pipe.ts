import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroUsuarioChat'
})
export class FiltroUsuarioChatPipe implements PipeTransform {

  transform(arreglo: any[], texto:String): any[] {
    if(texto === ''){
      return arreglo;
    }

    texto = texto.toLocaleLowerCase();
    return arreglo.filter(item=>{
      let contcat =item.email+item.phone;
      return item.customName.includes(texto)
    })

  }

}
