import {Component, OnInit, OnDestroy} from '@angular/core';
import {ModalService} from './modal.service';

@Component({
    selector: 'modal-component',
    template: `
	<div class="qz-modal-backdrop" id="modal-backdrop" [hidden]="modalService.modalBackdropHidden">
		<div class="modal-exterior animated fadeInDown">
			<div class="modal-interior">
				<div class="modal-title">
					<span id="modal-header">{{modalService.header}}</span>
					<div class="modal-dismiss" id="modal-dismiss" title="Close" (click)="modalService.closeModal()">
						<i class="fa fa-times"></i>
					</div>
				</div>
				<div class="qz-modal-body" id="modal-body">
					{{modalService.body}}
				</div>
				<div class="modal-bottom-buttons" id="modal-footer" [hidden]="modalService.confirmModalHidden">
					<input type="button" class="btn btn-success pull-right" value="Confirm" id="confirm-button" (click)="modalService.confirmCallback();modalService.closeModal()" />
					<input type="button" class="btn btn-danger pull-right" value="Cancel" (click)="modalService.closeModal()" />
				</div>
			</div>
		</div>
	</div>
	`
})

export class ModalComponent implements OnInit, OnDestroy {

    constructor(
        public modalService: ModalService
    ) { }

    ngOnInit() { }

    ngOnDestroy() { }
}