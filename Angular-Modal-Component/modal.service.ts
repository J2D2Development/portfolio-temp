import {Injectable, Output} from '@angular/core';

@Injectable()
export class ModalService {
    modalBackdropHidden: boolean = true;
    header: string;
    body: string;
    confirmModalHidden: boolean = true;
    callback;
    callbackName;
    confirmButton;
    confirmCallback;
    element;

    constructor() {

    }

    closeModal() {
        this.modalBackdropHidden = true;
    }

    //show a modal dialog- pass it a config object with options, or nothing for a basic modal:
	/*
		headline: string (the headline for the modal)
		body: string (body of the modal)
		type(optional): 'confirm' (adds ok/cancel buttons to bottom)
		element(options, required with type): reference to 'this' of original object
	*/
    showModal(config) {
        //set up defaults just in case
        let type = config && config.type ? config.type : 'none';
        let headline = config && config.headline ? config.headline : 'Default Modal Headline';
        let body = config && config.body ? config.body : 'This is the default modal bodytext';
        this.callback = config && config.callback ? config.callback : '';
        this.element = config && config.element ? config.element : 'none';

        if (type === 'confirm') {
            this.confirmModalHidden = false;
            //tricky here- we need the 'this' binding from the calling component- best way is to pass it in the config object- see contactedit.component.ts for process
            this.confirmCallback = this.callback.bind(this.element);
        }
        this.header = headline;
        this.body = body;
        this.modalBackdropHidden = false;
    }
}