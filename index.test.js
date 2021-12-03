const core = require('@actions/core');
const { run } = require('./index.js');

jest.mock('@actions/core')

test('When running the action', async () => {
  
  await run() 
  expect(core.setOutput).toHaveBeenCalledWith('release-url', expect.anything( ) )
}); 

