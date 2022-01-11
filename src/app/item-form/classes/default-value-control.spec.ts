import { DefaultValueControl } from './default-value-control';

describe('Defaultvaluecontrol', () => {
  const defaultControl = new DefaultValueControl('Mock Value');

  it('should patch the control to the default value if the control value is null/empty', () => {
    defaultControl.patchValue('');
    expect(defaultControl.value).toEqual('Mock Value');  
  });

  it('should mark the control dirty if the control value is not equal to the default value', () => {
    defaultControl.patchValue('Dirty');
    expect(defaultControl.dirty).toBeTrue();
  });

  it('should mark the control pristine if the control value is equal to the default value', () => {
    defaultControl.patchValue('Mock Value');
    expect(defaultControl.pristine).toBeTrue();
  });
});
