import daybookRouter from '@/modules/daybook/router';

describe('Router Module - Daybook', () => {
  it('should be setup properly', async () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function)
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        }
      ]
    });
 
    const promiseRoutes = [];
    daybookRouter.children.forEach(child => promiseRoutes.push(child.component())); //push each children's with their component prop into array

    const routes = (await Promise.all(promiseRoutes)).map(route => route.default.name); //get the name of all the children

    expect(routes).toContain('EntryView'); //expect the array to contain this name
    expect(routes).toContain('NoEntrySelected');

  });

  it('Should return id of the route', () => {
    const route = {
      params: {
        id: 'ABC-123'
      }
    };

    const entryRoute = daybookRouter.children.find(child => child.name === 'entry');
    
    expect(entryRoute.props(route)).toEqual({id: 'ABC-123'});
  })
})