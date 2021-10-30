import { types } from "../../types/types";

describe('types tests', () => {

    test('provided types should match the next types:  ', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',

            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',

            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',

            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set Active note',
            notesLoad: '[Notes] Load Note',
            notesUpdated: '[Notes] Updated Note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        })
    });

});