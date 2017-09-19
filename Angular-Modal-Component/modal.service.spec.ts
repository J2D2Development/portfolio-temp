declare const describe: any;
declare const expect: any;
declare const it: any;
declare const beforeEach: any;

import { ModalService } from './modal.service';

describe('Modal Service Tests', () => {
    beforeEach(() => {
        this.modalService = new ModalService();
    });

    it('modalBackdropHidden should be initialize to true', () => {
        expect(this.modalService.modalBackdropHidden).toEqual(true);
    });

    it('Should show modal on creation', () => {
        this.modalService.showModal();
        expect(this.modalService.modalBackdropHidden).toEqual(false);
    });

    it('Should create modal with defaults if no config object passed', () => {
        this.modalService.showModal();
        expect(this.modalService.header).toEqual('Default Modal Headline');
        expect(this.modalService.body).toEqual('This is the default modal bodytext');
        expect(this.modalService.callback).toEqual('');
        expect(this.modalService.element).toEqual('none');
    });

    it('Should create confirm modal if confirm type passed in config options object', () => {
        const element = document.createElement('div');
        const callback = function callback() { console.log('I am a callback') };
        this.modalService.showModal({ type: 'confirm', callback: callback, element: element });

        expect(this.modalService.confirmModalHidden).toEqual(false);
    });

    it('Should attach provided callback to provided element in confirm modal option', () => {
        const element = document.createElement('div');
        const callback = function callback() { console.log('I am a callback') };
        this.modalService.showModal({ type: 'confirm', callback: callback, element: element });

        expect(this.modalService.element).toEqual(element);
        expect(this.modalService.callback).toEqual(callback);
    });

    it('Should close the modal on closeModal() call', () => {
        this.modalService.closeModal();
        expect(this.modalService.modalBackdropHidden).toEqual(true);
    });
});