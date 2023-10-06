import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  actividades = [
      {nombre: 'Senderismo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6U-EGbMj_-0-Sn4mpy6Sj5sT9B1kCx7crw&usqp=CAU' } ,
      {nombre: 'Ciclismo', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRfFIHA0tmqGr2xIjnvFdIU8htfx0UzsMctg&usqp=CAU' }, 
      {nombre: 'Correr', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_9MZXudv7iRzwFPVIgyIb1dTALgE-cLbSg&usqp=CAU' } ,
    ];

  ngOnInit(): void {
    this.createCards();
  }

  createCards(): void {
    const principalDiv = document.getElementById('principal');

    if (principalDiv) {
      this.actividades.forEach(actividad => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'p-4', 'mx-2');
        cardDiv.style.width = '18rem';

        const img = document.createElement('img');
        img.src = actividad.imagen; 
        img.classList.add('card-img-top');
        img.alt = 'Imagen de ' + actividad;
        img.style.objectFit = 'contain';
        img.style.maxWidth = '100%'; 
        img.style.height = 'auto';  

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body', 'justify-content-center', 'align-items-center');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'text-center');
        cardTitle.textContent = actividad.nombre;

        const cardLink = document.createElement('a');
        cardLink.href = '#';
        cardLink.classList.add('btn', 'btn-info', 'd-flex', 'justify-content-center', 'align-items-center');
        cardLink.textContent = 'Ir a ' + actividad.nombre;

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardLink);

        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBodyDiv);

        principalDiv.appendChild(cardDiv);
      });
    }
  }
}
