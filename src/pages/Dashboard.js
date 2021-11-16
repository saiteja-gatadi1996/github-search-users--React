import React from 'react'
import { Info, Repos, User, Search, Navbar } from '../components'
import loadingImage from '../images/preloader.gif'
import { useGithubContext } from '../context/context'
const Dashboard = () => {
  return (
    <main>
      <main>
        <Navbar></Navbar>
        <Search />
        <Info />
        <User />
        <Repos />
      </main>
    </main>
  )
}

export default Dashboard

//Learnings:
//Instead of writing 5 lines of imports, we had them in index.js and directly imported them from '../components', as we are naming it as index.js, we don't need to mention the name even :)
