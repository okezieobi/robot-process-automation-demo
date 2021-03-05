import services from '../services';

describe('User should be able to submit form successfully', () => {
  it('Form should shbmit successfully', async () => {
    const request = {
      firstname: 'Frank Okezie',
      lastname: 'Obiedere',
      email: 'foo@bar.com',
      location: 'Lagos',
      phone: '000000000',
      resume: 'https://frontier-public-assets.s3-us-west-2.amazonaws.com/05oo7evmr4hsc7ufvmdcpojlh1ki1rd3benjo0g1_Brian_CV.docx',
      linkedIn: 'https://www.linkedin.com/in/frank-okezie-obiedere-b15a15157/',
    };

    const { success } = await services.submitForm(request);

    expect(typeof success).toBe('string');
    expect(success).toEqual('Your application is on its way!');
  }, 70000);
});
