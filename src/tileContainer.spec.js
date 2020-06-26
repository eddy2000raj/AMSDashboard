import React from 'react';
import { shallow } from 'enzyme';
import TileContainer from './tileContainer';



  it('TileContainer container should containe card', () => {
  
  const container = shallow(<TileContainer />);

  expect(container.find('.card').length).toEqual(1);
 });

 it("TileContainer container should containe 4 cards", async()=> {
   const container = shallow(<TileContainer />);
   //await waitUntil(() => container.state('resp') !== null);

   setTimeout(()=>{
        expect(container.find('.card').length).toEqual(4);
   },2000);
    
    //done()
    //expect(handleClick).toHaveBeenCalled();
  });


