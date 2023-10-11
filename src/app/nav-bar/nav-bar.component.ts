import { Component, Input, Output ,EventEmitter} from '@angular/core';
import { KeycloakProfile } from 'keycloak-js';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})


export class NavBarComponent {
  @Input() title: string = "";
  @Input() isLogueado: boolean = false;
  @Input() perfilUsuario: KeycloakProfile | null | undefined;
  
  @Output() messageEvent = new EventEmitter<string>();

  iniciarSesion() {
    this.messageEvent.emit("iniciarSesion");
  }

  cerrarSesion() {
    this.messageEvent.emit("cerrarSesion");
  }

  toggleModal() {
    const modal: any = document.querySelector('.modal');
    modal.style.display = 'block';
  }
}
