import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ContactsService } from '../../services/contactsService';
import { Contact } from '../../interfaces/contact';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails implements OnInit {

  id = input.required<number>();
  contacto = signal<Contact | undefined>(undefined);
  contactsService = inject(ContactsService);
  authService = inject(Auth);
  router = inject(Router);

  async ngOnInit() {
    this.contacto.set(await this.contactsService.getContactById(this.id()));
  }

  async eliminarContacto(id: number) {
    await this.contactsService.deleteContact(id);
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
      title: "Contacto eliminado"
    });
    this.router.navigate(["/contacts"]);
  }
}

