import { StatForm } from './stat-form';

describe('StatForm', () => {
  it('should have the corect controls', () => {
    let statForm = new StatForm();

    expect(statForm.controls.id).toBeTruthy();
    expect(statForm.controls.disabled).toBeTruthy();
    expect(statForm.controls.selectedStatOption).toBeTruthy();
    expect(statForm.controls.selectedStat).toBeTruthy();
    expect(statForm.controls.value).toBeTruthy();
    expect(statForm.get('value.min')).toBeTruthy();
    expect(statForm.get('value.max')).toBeTruthy();
    expect(statForm.get('value.option')).toBeTruthy();
  });
});
