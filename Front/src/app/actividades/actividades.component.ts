import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  actividades = [
      {nombre: 'Pesca', imagen: 'https://media-public.canva.com/89OdA/MAD95E89OdA/1/tl.png' } ,
      {nombre: 'Senderismo', imagen: 'https://media-public.canva.com/mQYyw/MAEWSDmQYyw/1/tl.png' }, 
      {nombre: 'Correr', imagen: 'https://media-public.canva.com/nhCaI/MAEcNYnhCaI/1/tl.png' } ,
      {nombre: 'Golf', imagen: 'https://media-public.canva.com/17QDU/MAEpaH17QDU/1/tl.png'},
      {nombre: 'Camping', imagen: 'https://media-public.canva.com/l3pQo/MAEZBml3pQo/1/tl.png'},
      {nombre: 'Football', imagen: 'https://media-public.canva.com/IpIqA/MAEiSZIpIqA/1/tl.png'}
    ];

  ngOnInit(): void {
    this.createCards();
  }

  createCards(): void {
    const principalDiv = document.getElementById('principal');

    if (principalDiv) {
      this.actividades.forEach(actividad => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'p-1', 'mx-2');
        cardDiv.style.width = '18vw';
        cardDiv.style.height = '18vw';

        const img = document.createElement('img');
        img.src = actividad.imagen;
        img.classList.add('card-img-top', "mt-4");
        img.alt = 'Imagen de ' + actividad;
        img.style.objectFit = 'contain';
        img.style.maxWidth = '10vw';
        img.style.height = '10vw';
        img.style.display = 'block';
        img.style.margin = 'auto';

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'text-center', 'mb-0');
        cardTitle.textContent = actividad.nombre;
        cardTitle.style.fontSize = '2vw';
        

        cardBodyDiv.appendChild(cardTitle);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        principalDiv.appendChild(cardDiv);
      });
    }
  }
}
