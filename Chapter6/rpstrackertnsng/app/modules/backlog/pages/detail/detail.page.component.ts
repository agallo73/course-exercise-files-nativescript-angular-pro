import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { PtItem, PtUser } from '../../../../core/models/domain';
import { BacklogService } from '../../services/backlog.service';

import { Store } from '../../../../core/state/app-store';
import { PtModalService } from '../../../../shared/modals/pt-modal.service';
import { TextInputModalComponent } from '../../../../shared/modals/text-input/text-input.modal.component';
import { PtNewTask, PtNewComment, PtTaskUpdate } from '../../../../shared/models/dto';
import { DetailScreenType } from '../../../../shared/models/ui/types';

@Component({
    moduleId: module.id,
    selector: 'pt-backlog-detail-page',
    templateUrl: 'detail.page.component.html',
    styleUrls: ['detail.page.component.css']
})
export class DetailPageComponent implements OnInit {

    public selectedDetailsScreen: DetailScreenType = 'details';
    public currentSelectedItem$: Observable<PtItem> = this.store.select<PtItem>('currentSelectedItem');
    public currentUser$: Observable<PtUser> = this.store.select<PtUser>('currentUser');

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private store: Store
    ) { }

    public ngOnInit() {
        this.backlogService.getItemFromCacheOrServer(parseInt(this.activatedRoute.snapshot.params['id']));
    }

    public onScreenSelected(screen: DetailScreenType) {
        this.selectedDetailsScreen = screen;
    }

    public onAddNewTask(newTask: PtNewTask) {
        this.backlogService.addNewPtTask(newTask, this.store.value.currentSelectedItem);
    }

    public onUpdateTask(taskUpdate: PtTaskUpdate) {
        this.backlogService.updatePtTask(this.store.value.currentSelectedItem, taskUpdate.task, taskUpdate.toggle, taskUpdate.newTitle);
    }

    public onAddNewComment(newComment: PtNewComment) {
        this.backlogService.addNewPtComment(newComment, this.store.value.currentSelectedItem);
    }

    public onItemSaved(item: PtItem) {
        this.backlogService.updatePtItem(item);
    }

    public onNavBackTap() {
        // TODO: navigate back to previous page
    }

}
