import { Component, Input } from '@angular/core';
import { FinicialService } from '../finicial.service';
import { LetrasTeiempo } from '../../letras-tiempo.service';

@Component({
  selector: 'app-rfinal',
  templateUrl: './rfinal.component.html',
  styleUrl: './rfinal.component.css'
})
export class RfinalComponent {

  @Input() miletrastiemposervice!:LetrasTeiempo ;

  constructor(public finicialService : FinicialService) {

    //let verlodeformulario = this.finicialService.registrousuarios;
  }

}
