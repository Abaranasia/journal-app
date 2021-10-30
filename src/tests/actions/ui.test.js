import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

// Estos test no son complejos porque las actions devuelven un objeto síncrono

describe('ui-actions tests', () => {
    test('All actions should work properly', () => {

        const action = setError('Testing error!!');

        expect(action).toEqual({
            type: types.uiSetError,
            payload: 'Testing error!!'
        })
    });
    const removeErrorAction = removeError();
    const startLoadingAction = startLoading();
    const finishLoadingAction = finishLoading();

    expect(removeErrorAction).toEqual({
        type: types.uiRemoveError
    });

    expect(startLoadingAction).toEqual({
        type: types.uiStartLoading
    });

    expect(finishLoadingAction).toEqual({
        type: types.uiFinishLoading
    });

});