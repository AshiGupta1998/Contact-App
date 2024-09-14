import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';

// Define your routes here
const routes: Routes = [
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: 'contacts', component: ContactListComponent },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'contact-form/:id', component: ContactFormComponent },
];

@NgModule({
  declarations: [AppComponent, ContactListComponent, ContactFormComponent, ConfirmationModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // Add RouterModule here
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
