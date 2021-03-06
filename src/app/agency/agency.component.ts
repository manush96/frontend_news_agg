import {Component, OnInit} from '@angular/core';
import {NewsService} from '../services/news.service';
import {NewsHome} from '../newsHome';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {UpdateNewsComponent} from '../update-news/update-news.component';
import {AdminService} from '../services/admin.service';
import {CreateNewsComponent} from '../create-news/create-news.component';

@Component({
    selector: 'app-agency',
    templateUrl: './agency.component.html',
    styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

     newsList: Response | void;
     newsHome: NewsHome;

    constructor(private newsService: NewsService, public dialog: MatDialog, private adminService: AdminService) {
        this.newsHome = new NewsHome();
    }

    ngOnInit() {
        this.newsService.findByNewsAgency(localStorage.getItem('currentUser')).then((res) => {
            console.log(res);
            this.newsList = res;
        }).catch(() => {
            console.log('error');
        });

    }

    updateNews(newsId) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: newsId,
            title: 'Login Here'
        };
        dialogConfig.height = 900;
        dialogConfig.width = 900;
        console.log(newsId);
        const dialogRef = this.dialog.open(UpdateNewsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed');
            console.log(result);
        });
    }

    deleteNews(newsId) {
        this.adminService.deleteNews(newsId).then(() => {
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
    }


    createNews() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            id: 1,
            title: 'Login Here'
        };
        dialogConfig.height = 500;
        dialogConfig.width = 800;

        const dialogRef = this.dialog.open(CreateNewsComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            console.log('Dialog was closed');
            console.log(result);
        });
    }

    createStory() {

    }
}
