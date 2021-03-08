import { StatFilterForm } from './stat-filter-form';

describe('StatFilterForm', () => {
  it('should have the corect controls', () => {
    let statForm = new StatFilterForm();

    expect(statForm.controls.type).toBeTruthy();
    expect(statForm.controls.disabled).toBeTruthy();
    expect(statForm.controls.filters).toBeTruthy();
    expect(statForm.controls.value).toBeTruthy();
    expect(statForm.get('value.min')).toBeTruthy();
    expect(statForm.get('value.max')).toBeTruthy();
  });
});
