import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../api.service';
import { Board } from '../board';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit {

  boards: Board[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getBoards().subscribe((boards: Board[]) => {
      this.boards = boards;
    });
  }
}
