import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../services/contactsService';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink],
  selector: 'app-contact-details',
  styleUrl: './contact-details.scss',
  templateUrl: './contact-details.html',
})
export class ContactDetails implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  contactsService = inject(ContactsService);

  contacto = signal<Contact | undefined>(undefined);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const encontrado = this.contactsService.contactList.find(c => c.id.toString() === id);
      this.contacto.set(encontrado);
    }
  }

  eliminarContacto(id: string) {
    this.contactsService.deleteContact(id);

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

    this.router.navigate(['/contacts']);
  }
}

