import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../Models/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact?: Contact;
  @Output() save = new EventEmitter<void>();
  contactForm: FormGroup;
  isEditMode: boolean = false;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {
    this.contactForm = this.fb.group({
      id: [],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact']) {
      if (this.contact) {
        this.contactForm.patchValue(this.contact);
          this.isEditMode = true;
      } else {
        this.contactForm.reset(this.contact);
      }
      this.cdr.detectChanges();
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.contact?.id) {
        this.contactService
          .updateContact(this.contactForm.value)
          .subscribe(() => this.save.emit());
      } else {
        this.contactService
          .addContact(this.contactForm.value)
          .subscribe(() => this.save.emit());
      }
    }
  }

  onCancel(): void {
    this.contactForm.reset();
    this.save.emit(); // Close the modal
  }
}
