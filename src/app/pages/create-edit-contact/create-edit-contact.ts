import { Component, inject, signal } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { form, FormField } from '@angular/forms/signals';
import { ContactsService } from '../../services/contactsService';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField],
  selector: 'app-create-edit-contact',
  styleUrl: './create-edit-contact.scss',
  templateUrl: './create-edit-contact.html',
})
export class CreateEditContact {

  contactsService = inject(ContactsService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  contactId = signal<string | null>(null);

  newContactModel = signal<Contact>({
    id: '',
    nombre: '',
    apellido: '',
    numeroTelefono: ''
  });

  formCreateContact = form(this.newContactModel);

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.contactId.set(idParam);
      
      const contactoExistente = this.contactsService.contactList.find(
        (c) => c.id.toString() === idParam
      );

      if (contactoExistente) {
        this.newContactModel.set({ ...contactoExistente });
      }
    }
  }

onSubmit(event: Event) {
  event.preventDefault();

  if (this.contactId()) {
    // MODO EDICIÓN
    const index = this.contactsService.contactList.findIndex(
      (c) => c.id.toString() === this.contactId()
    );

    if (index !== -1) {
      this.contactsService.contactList[index] = { ...this.newContactModel() };
    }

    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Contacto actualizado"
    });

    this.router.navigate(['/contacts']); // Te redirige a la lista
  } else {
    // MODO CREACIÓN
    // Si tu servicio agregarContacto no le asigna id, le generamos uno basado en la fecha o longitud
    const nuevoContacto = {
      ...this.newContactModel(),
      id: Date.now().toString() // Genera un ID único temporal
    };

    if (this.contactsService.agregarContacto) {
      this.contactsService.agregarContacto(nuevoContacto);
    } else {
      this.contactsService.contactList.push(nuevoContacto);
    }

    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon: "success",
      title: "Contacto creado"
    });

    this.router.navigate(['/contacts']); 
  }
}
}