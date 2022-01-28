import { Component, OnInit, } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { ResponseClientsList } from '../client.model';
import { DeleteDialogComponent } from 'projects/shared/src/app/components/dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {


  clients: ResponseClientsList = new ResponseClientsList();

  constructor(
    public dialog: MatDialog,
    public clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.clientService.getList().subscribe(res => {
      this.clients = res;
      this.clients.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
    });
  }

  openDialog(client: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '320px',
      height: '280px',
      data: client
    });

    dialogRef.afterClosed().subscribe((id: number) => {
      if (id) {
        this.clientService.delete(id).subscribe(res => {
          this.clients.data = this.clients.data.filter(item => {
            return item.id !== id;
          });
        });
      }
    });
  }
}
