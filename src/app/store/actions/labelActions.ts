import { IReduxAction } from '../reducers/reducers';
import { ActionTypes } from '../constants/actionTypes';
import { ILabel, LabelService } from '@app/components/shared/services/label.service';

export class LabelActions {
  static getLabelsIfNeeded = (state: any, api: LabelService) => {
    return dispatch => {
      if (state.labels.get('all')) {
        return;
      }

      api.getLabels().subscribe(labels => {
        dispatch(LabelActions.setLabels(labels));
      });
    };
  }

  static setLabels = (payload: Array<ILabel>): IReduxAction<Array<ILabel>> => {
    return {
      type: ActionTypes.SET_LABELS,
      payload
    };
  }
}
