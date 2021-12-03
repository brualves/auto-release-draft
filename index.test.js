const core = require('@actions/core');
 require('./index.js');

jest.mock('@actions/core')

test('When running the action', async () => {
  
  expect(core.setOutput).toHaveBeenCalledWith('release-url', expect.anything( ) )
}); 

