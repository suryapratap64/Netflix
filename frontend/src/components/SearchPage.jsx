import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import AddMovie from './AddMovie'
import MovieDetails from './MovieDetails'

const SearchPage = () => {


  return (
   <>
   <div className='flex flex-col'>
    <MovieDetails/>
    <AddMovie/>

     
   </div>


   </>
  )
}

export default SearchPage
