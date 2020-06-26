import React, { useState, useEffect } from 'react';

const API_URL=`${[process.env.REACT_APP_API_URL]}` ;


const BooksList= (props)=> {

   const [books, updateBooks] = useState([]);
   const [counter,updateCounter]=useState(0);
   const [prevCounter,updatePrevCounter]=useState(0);
   //const previousCounterRef = useRef(0);
   
   const addBook = () => {
       // update the books state property by adding a new book
       updatePrevCounter(counter);
       updateCounter(counter+1);
   }
   
   const removeBook = () => {
       

       if(counter>0){
          // update the books state property by adding a new book
         updatePrevCounter(counter);
         updateCounter(counter-1);
       }
      
   }

   useEffect(() => {
       //console.log(previousCounterRef);
       if(prevCounter>counter){
         //books=books.splice(-1,1);
         let newBooks=books.slice(0,prevCounter);
         updateBooks(newBooks);
       }else{
         updateBooks([...books, { name: 'A new Book', id: counter}]);
       }
       
   },[counter,prevCounter]);


   if(books.length>0){

     return (
           <div>
           <h1>{props.tableTitle}</h1>
           <div><button  onClick={addBook}>+</button></div>
           <div><button  onClick={removeBook}>-</button></div>
           <ul>
               {books.map(book => (
                <li key={book.id} >{book.name}</li>  
               ))}
           </ul>
           </div>
           )

   }else{
     return (
             <div>
               Loading.....
             </div>
            )
   }
   
   ;
}



export default BooksList ;
