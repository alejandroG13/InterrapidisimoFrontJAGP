import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({

    exports: [
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule,
        MatCheckboxModule
    ]
})

export class MaterialModule { }